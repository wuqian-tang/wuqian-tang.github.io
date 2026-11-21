#!/usr/bin/env node
// Browser regression checks. Serve site/ first; see README for invocation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.NAVIGATION_BASE_URL || 'http://127.0.0.1:8880/';
const output = process.env.NAVIGATION_OUTPUT || '/tmp/wuqian-navigation-check';
const smoke = process.argv.includes('--smoke');
const sections = ['about', 'news', 'research', 'publications', 'experience', 'awards', 'teaching', 'hobbies'];
const results = [];
fs.mkdirSync(output, { recursive: true });
async function settle(page) {
  let last='', stableSince=Date.now(); const started=Date.now();
  while(Date.now()-started<8000){
    // Poll from Node: page-side animation callbacks are disabled in no-JS checks.
    const value=await page.evaluate(()=>{
      const h=document.querySelector('.site-header')?.getBoundingClientRect();
      return [scrollY,h?.top,h?.height].join(':');
    });
    if(value!==last){last=value;stableSince=Date.now()}
    if(Date.now()-stableSince>=220)return;
    await page.waitForTimeout(40);
  }
  throw new Error('scroll/header did not settle');
}
async function geometry(page, id) {
  return page.evaluate(id => {
    const target = document.getElementById(id), header = document.querySelector('.site-header');
    const h = header.getBoundingClientRect(), r = target.getBoundingClientRect();
    return { id, top: r.top, bottom: r.bottom, headerBottom: h.bottom, headerHeight: h.height,
      y: scrollY, max: document.scrollingElement.scrollHeight - innerHeight, viewport: innerHeight,
      font: parseFloat(getComputedStyle(document.documentElement).fontSize),
      current: document.querySelector('.site-nav [aria-current]')?.hash,
      hidden: header.classList.contains('is-hidden'), hash: location.hash,
      open: target.closest('details')?.open, overflow: document.documentElement.scrollWidth > innerWidth };
  }, id);
}
function aligned(m, section) {
  assert.equal(m.current, '#' + section, 'clicked destination must retain highlight');
  assert.equal(m.overflow, false, 'page must fit viewport');
  assert.ok(m.headerBottom > 0 && !m.hidden, 'navigation must keep mobile header visible');
  if (Math.abs(m.y - m.max) <= 1 && m.top > m.headerBottom + m.font + 2) {
    assert.ok(m.top < m.viewport, 'scroll-limited destination must be visible');
  } else {
    const gap = m.top - m.headerBottom;
    assert.ok(Math.abs(gap - m.font) <= 2, `target gap ${gap.toFixed(2)} must be one em below header (${m.font})`);
  }
}
async function clickNavigation(page, id, mobile) {
  if (mobile) {
    if (await page.locator('.site-header').evaluate(e => e.classList.contains('is-hidden'))) {
      await page.mouse.wheel(0, -100); await settle(page);
    }
    if (!(await page.locator('#site-nav').evaluate(e => e.classList.contains('is-open')))) {
      await page.locator('.menu-toggle').click();
    }
  }
  await page.locator(`.site-nav a[href="#${id}"]`).click();
  await settle(page);
}
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  async function check(name, fn) {
    try { await fn(); results.push({ name, status: 'passed' }); console.log('PASS', name); }
    catch (error) { results.push({ name, status: 'failed', error: error.message }); console.error('FAIL', name, error.message); }
  }
  const sizes = smoke ? [[390,844],[1440,900]] : [[320,740],[390,844],[768,1024],[844,390],[999,768],[1000,768],[1024,768],[1440,900],[2560,1440]];
  for (const [width,height] of sizes) {
    const mobile = width < 1000;
    const context = await browser.newContext({ viewport: {width,height}, isMobile:mobile, hasTouch:mobile });
    const page = await context.newPage(), errors=[];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, {waitUntil:'networkidle'}); await page.evaluate(() => document.fonts.ready);
    for (const id of (smoke ? ['publications'] : ['research','publications','experience','awards','teaching','hobbies','news','about'])) {
      await check(`${width}x${height} click ${id}`, async () => {
        await clickNavigation(page,id,mobile); const m=await geometry(page,id); aligned(m,id);
        if (id==='about') assert.ok(await page.locator('.eyebrow').first().evaluate(e=>e.getBoundingClientRect().top>=document.querySelector('.site-header').getBoundingClientRect().bottom), 'About tagline must remain visible');
        if (['publications','teaching'].includes(id) && [390,1440,2560].includes(width)) await page.screenshot({path:path.join(output, `${width}x${height}-${id}.png`)});
      });
    }
    await check(`${width}x${height} script errors`,async()=>assert.deepEqual(errors,[]));
    await context.close();
  }
  if (!smoke) {
    const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    const page = await context.newPage();
    await page.goto(base,{waitUntil:'networkidle'});
    await check('mobile direct fragment and repeated click', async()=>{
      await page.goto(new URL('#publications',base).href,{waitUntil:'networkidle'}); await settle(page);
      aligned(await geometry(page,'publications'),'publications');
      await clickNavigation(page,'publications',true);
      aligned(await geometry(page,'publications'),'publications');
    });
    await check('mobile deep More paper uses the same offset', async()=>{
      await clickNavigation(page,'research',true);
      await page.locator('.research-evidence a[href="#paper-c1"]').click(); await settle(page);
      const m=await geometry(page,'paper-c1'); aligned(m,'publications'); assert.equal(m.open,true);
    });
    await check('mobile direct More award uses the same offset', async()=>{
      await page.goto(new URL('#award-iccad-contest-2026',base).href,{waitUntil:'networkidle'}); await settle(page);
      const m=await geometry(page,'award-iccad-contest-2026'); aligned(m,'awards'); assert.equal(m.open,true);
    });
    await check('mobile actual touch resumes header hiding', async()=>{
      await clickNavigation(page,'publications',true);
      const session=await context.newCDPSession(page);
      const swipe=async(from,to)=>{
        await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:300,y:from}]});
        for(let i=1;i<=12;i++){
          await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:300,y:from+(to-from)*i/12}]});
          await page.waitForTimeout(16);
        }
        await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      };
      await swipe(600,360);
      await settle(page); assert.equal((await geometry(page,'publications')).hidden,true);
      await swipe(400,540);
      await settle(page); assert.equal((await geometry(page,'publications')).hidden,false); await session.detach();
    });
    await check('open mobile menu remains visible during scrolling', async()=>{
      await page.locator('.menu-toggle').click(); await page.mouse.wheel(0,300); await settle(page);
      assert.equal((await geometry(page,'publications')).hidden,false);
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
      await page.keyboard.press('Escape');
    });
    await check('browser Back and Forward retain correct landing', async()=>{
      await clickNavigation(page,'publications',true); await clickNavigation(page,'news',true);
      await page.goBack(); await settle(page); aligned(await geometry(page,'publications'),'publications');
      await page.goForward(); await settle(page); aligned(await geometry(page,'news'),'news');
    });
    await check('resize to desktop and enlarged font remeasure header', async()=>{
      await page.setViewportSize({width:1440,height:900});
      await page.addStyleTag({content:'html {font-size:125%}'}); await page.waitForTimeout(200);
      await clickNavigation(page,'research',false); aligned(await geometry(page,'research'),'research');
      await page.setViewportSize({width:390,height:844}); await clickNavigation(page,'publications',true);
      aligned(await geometry(page,'publications'),'publications');
    });
    await context.close();
    for (const [width,height] of [[1440,900],[2560,1440]]) {
      const c=await browser.newContext({viewport:{width,height}}); const p=await c.newPage();
      await p.goto(base,{waitUntil:'networkidle'});
      await check(`${width} automatic down/up section order`,async()=>{
        await p.mouse.move(width-60,Math.min(height-60,500)); await p.mouse.wheel(0,100); await settle(p);
        const max=await p.evaluate(()=>document.scrollingElement.scrollHeight-innerHeight); const order=[];
        for(const position of Array.from({length:151},(_,i)=>max*i/150).concat(Array.from({length:151},(_,i)=>max*(1-i/150)))){
          await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),position); await p.waitForTimeout(25);
          const active=await p.locator('.site-nav [aria-current]').getAttribute('href');
          if(order.at(-1)!==active)order.push(active);
        }
        assert.deepEqual(order, sections.map(s=>'#'+s).concat(sections.slice(0,-1).reverse().map(s=>'#'+s)));
      });
      await check(`${width} manual selection survives More/layout changes`,async()=>{
        await clickNavigation(p,'teaching',false);
        await p.evaluate(()=>{const d=document.querySelector('#publications details');d.open=true});await settle(p);
        assert.equal((await geometry(p,'teaching')).current,'#teaching');
        await p.evaluate(()=>{document.querySelector('#publications details').open=false});await settle(p);
        assert.equal((await geometry(p,'teaching')).current,'#teaching');
      });
      if(width===2560) await check('page-limit wheel and keys preserve manual priority',async()=>{
        await clickNavigation(p,'teaching',false);const before=await geometry(p,'teaching');
        assert.equal(before.current,'#teaching','repeated click after More changes must retain selection');
        assert.equal(before.y,before.max);await p.mouse.move(1400,650);
        await p.mouse.wheel(0,300);await settle(p);
        assert.equal((await geometry(p,'teaching')).current,'#teaching');
        for(const key of ['PageDown','End','ArrowDown']){
          await p.keyboard.press(key);await settle(p);
          const m=await geometry(p,'teaching');assert.equal(m.y,before.y);assert.equal(m.current,'#teaching');
        }
        await p.mouse.wheel(0,-900);await settle(p);
        assert.ok((await geometry(p,'teaching')).y<before.y);
        assert.notEqual((await geometry(p,'teaching')).current,'#teaching');
      });
      await c.close();
    }
    {
      const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
      const p=await c.newPage();
      await p.addInitScript(()=>{
        delete window.ResizeObserver;
        window.addEventListener('resize',event=>event.stopImmediatePropagation(),{capture:true,once:true});
      });
      await p.goto(new URL('#teaching',base).href,{waitUntil:'networkidle'});await settle(p);
      await check('initial mobile offset is correct before resize observers run',async()=>aligned(await geometry(p,'teaching'),'teaching'));
      await c.close();
    }
    {
      const c=await browser.newContext({viewport:{width:768,height:1600},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
      const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});
      await check('page-limit touch preserves manual priority',async()=>{
        await clickNavigation(p,'teaching',true);const before=await geometry(p,'teaching');assert.equal(before.y,before.max);
        const session=await c.newCDPSession(p);
        await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:650,y:1200}]});
        for(let i=1;i<=10;i++){
          await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:650,y:1200-i*20}]});await p.waitForTimeout(20);
        }
        await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await settle(p);
        const m=await geometry(p,'teaching');assert.equal(m.y,before.y);assert.equal(m.current,'#teaching');await session.detach();
      });await c.close();
    }
    for(const reducedMotion of ['reduce','no-preference']){
      const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion,colorScheme:'dark'});
      const p=await c.newPage();await p.goto(new URL('#teaching',base).href,{waitUntil:'networkidle'});await settle(p);
      await check(`dark mobile ${reducedMotion} direct fragment`,async()=>aligned(await geometry(p,'teaching'),'teaching'));
      await c.close();
    }
    for(const [width,height]of [[390,844],[1440,900]]){
      const c=await browser.newContext({viewport:{width,height},javaScriptEnabled:false});const p=await c.newPage();
      await p.goto(new URL('#publications',base).href,{waitUntil:'networkidle'});await settle(p);
      await check(`${width} no-JavaScript native destination is visible`,async()=>{
        const m=await geometry(p,'publications');assert.ok(m.top>=Math.max(0,m.headerBottom)-2);assert.ok(m.top<m.viewport/2);
      });await c.close();
    }
    const c=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await c.newPage();
    await check('gallery home return and media still work',async()=>{
      await p.goto(new URL('awards/teaching-excellent-2026.html',base).href,{waitUntil:'networkidle'});
      const count=c.pages().length;
      await p.locator('.gallery-back').click();await p.waitForURL(u=>u.pathname===new URL(base).pathname);assert.equal(c.pages().length,count);
      await clickNavigation(p,'awards',true);
      await p.locator('[data-media="hsinchu-youth-2026:photo"]').first().click();
      assert.equal(await p.locator('.photo-dialog').evaluate(d=>d.open),true);
      await p.keyboard.press('Escape');
    });await c.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(output,'results.json'), JSON.stringify(results,null,2));
  const failed=results.filter(r=>r.status==='failed');console.log(`${results.length-failed.length}/${results.length} passed`);
  if(failed.length) process.exitCode=1;
})().catch(error => {console.error(error);process.exitCode=1});
