# 个人主页进度与维护规范

更新日期：2026-10-03。本文用于继续维护当前网站；以后开始更新前，先阅读本文，再检查实际仓库和线上内容。

- 网站：[wuqian-tang.github.io](https://wuqian-tang.github.io/)
- 公开仓库：[wuqian-tang/wuqian-tang.github.io](https://github.com/wuqian-tang/wuqian-tang.github.io)
- 发布分支：`master`；GitHub Actions 只发布 `site/`。
- 用户已授权上线、公开网页仓库和继续修改当前网站。原始个人资料仓库保持 private。

## 当前完成的内容

- 英文主页，姓名为 Wuqian Tang（唐梧遷）；保留原头像、LinkedIn、Google Scholar、公开版 CV。
- Recent News 只保留 2026 年，目前 4 条；右侧使用 Latest Updates。句末加方括号资源链接，移除 TAPCO 的正文跳转。助教新闻仅对应 Spring 2026 的奖状、奖杯与照片。
- 删除 About Me 最后的研究标签、甲骨文研究介绍句和 Technical Skills 栏目；甲骨文论文仍保留在 Publications 中。
- 主栏目与 Education、Research & Industry 等子标题统一为 Title Case，取消子标题的 CSS 全大写转换。
- 爱好栏目使用 Hobbies，标题与其他栏目一致；删除 Off the Clock / Personal Interests 引导文字。包含 badminton、swimming、table tennis。
- 羽毛球首页照片为 4:3 半身展示，文字与照片顶端对齐；弹窗只裁去上方 25% 的窗帘区域，保留其余全身照片。下面只保留 [Medal]，移除重复的 [Photo]。原图字节不变，通过 View Original 查看完整原图。
- 首页获奖展示照改为新竹市优秀青年照片第 2 张；保留行健奖照片。IWLS 完整照片仍在对应相册中。
- 王老师主页链接为 `http://nthucad.cs.nthu.edu.tw/~wcyao/`。
- 6 门助教课程先写教师，再写 Department of Computer Science、Department of Electrical Engineering 或 College of Semiconductor Research。
- Teaching 中的助教获奖括号写获奖对应的学期，而不是颁发月份：Excellent 为 Spring 2026；Outstanding 为 Spring 2025、Fall 2025、Spring 2026。已逐张查看奖杯及三张奖状上的学期。
- 31 个奖项相册，含 87 份原始奖状、照片、奖杯、奖牌及纪念牌文件，另有 24 张 PDF 奖状预览。所有原始文件按 SHA-256 校验，未重压缩。
- 所有奖项均补上月份；合并条目展示时间范围，正文保留各次获奖月份。Awards、Education、Experience 和相册中所有范围在 en dash 后固定换行；起止月份与年份保持为完整一行。实习经历补全起始年份。
- 奖项标题字体、字号、字重、颜色一致。资源同行排列为 Media: […] │ News: […]，窄屏自然换行；删除比赛介绍与项目介绍，仅保留 31 个对应的公告链接（29 个不同 URL）。使用完整 Department 标签，多个题目/年份附简短区分。
- Research 标题为 Research Interests，移除 Current Interests，导航仍为 Research；方向名称统一 Physical Design Automation，描述仍对应已有研究。最上方学科介绍全大写。
- 首页奖项资源直接打开弹窗，支持上一张/下一张、左右键、触控滑动、Escape 和焦点返回。PDF 奖状使用预览；保留相册页作为无 JavaScript 回退。2022 ICCAD 横向奖状在预览与弹窗中转正，其他图片遵循正确 EXIF 方向。
- 所有外部链接使用新分页及 noopener/noreferrer；页面没有 download 属性或下载按钮。保留普通 CV / 论文 PDF 查看链接与 View Original。
- 删除 My name is highlighted;，本人作者名仍加粗。
- Publications 共 21 篇：18 篇有经过核对的 DOI，3 篇标记 To appear。所有页面上的论文 PDF 链接都指向本仓库。
- 已本地托管 5 篇论文 PDF：J1 CB-EVO、J2 甲骨文论文、C1 DATE 2024、C15 HyPAS、C17 TAPCO。TAPCO 仅提取了最终论文 PDF，没有公开申请目录或其他申请资料。

## 论文 DOI 与 PDF 状态

| 条目 | 当前处理 | 后续动作 |
| --- | --- | --- |
| J1、C1–C14 | DOI 来自 Crossref 的完整标题与 Wuqian Tang 作者匹配 | 出版信息改变时更新卷期页码；继续找官方公开全文 |
| J2 | DOI、英文题名和作者已核对；从 Airiti 的 OpenAccess 全文下载官方 35 页 PDF | 保留 In Chinese，公开链接仍使用本仓库 PDF |
| C15 HyPAS | 最终稿印有 `10.1145/3770743.3804137`；已托管 7 页 PDF | 2026-10-03 DOI 解析返回 404，稍后复查 |
| C17 TAPCO | 最终稿印有 `10.1145/3831599.3840364`；已托管带 artifact badges 的 8 页最终稿 | 2026-10-03 DOI 解析返回 404，稍后复查 |
| C16 QUBO LBR | 官方 DAC 2026 程序核实了题目与作者，但未找到 DOI；依用户要求标记 To appear | DOI 发布后补链接并去掉 To appear，不猜编号 |
| C18 ICCAD 2026 | To appear，会议 2026-11-08 至 11-12 | 会议后核对正式 DOI、页码、最终公开 PDF |
| C19 ICCD 2026 | To appear，会议 2026-11-16 至 11-18 | 会议后核对正式 DOI、页码、最终公开 PDF |

PDF 来源和 SHA-256 见 `content/public-assets.json`；DOI 核对来源和日期见 `content/profile.json`。J1 来源为 Bei Yu 老师公开论文文件，C1 来源为 DATE 官方 proceedings，J2 为期刊官方全文，HyPAS / TAPCO 为作者提供的最终稿。页面不再链接 Fangzhou 的个人网站或其他人的 PDF 地址。

其余论文的官方全文下载目前未成功，未添加空文件或失效的 PDF 按钮。IEEE 请求返回 418、ACM 请求返回 403，不能据此判定论文没有 PDF。DATE 2026 官方程序中的 C13 / C14 下载地址目前返回 404，需要以后复查。

## 后续复查清单

这些是人工维护事项，没有创建自动定时任务。

| 建议时间 | 检查内容 | 完成条件 |
| --- | --- | --- |
| 2026-10-10 至 10-17 | HyPAS、TAPCO DOI 解析及 ACM / Crossref 元数据 | DOI 正确解析，更新进度记录中的待生效状态 |
| 2026-10-17 至 10-31 | QUBO LBR 正式论文记录与 DOI | 确认完整题目、作者、会议对应后补 DOI，取消 To appear |
| 2026-11-13 之后 | ICCAD 2026 C18 | 取得正式出版记录，补 DOI 和可公开最终 PDF |
| 2026-11-19 之后 | ICCD 2026 C19 | 取得正式出版记录，补 DOI 和可公开最终 PDF |
| 下次更新论文时 | C2–C14 尚缺的官方公开 PDF、特别是 DATE 2026 C13 / C14 | 下载真实论文并核对标题、作者、页数，托管到本仓库 |
| 下次更新奖项时 | 2026 优良助教、2026 年 8 月杰出助教、铭传杰出系友等新公告 | 找到包含本人或团队、奖项和正确年份的直接公告 |
| 2027 年更新时 | Recent News 年份、Teaching 学期、在读与奖学金持续状态 | 与作者确认最新事实；不能只因时间过去而自动改状态 |

ISPD 2026 通用比赛页的当前获奖名单与本人证书不一致，因此暂不作为获奖证明链接；使用本人证书和清华资工系公告。清华电资学院部分旧公告已跳转首页，已改用保留对应公告的清华官方校讯 PDF（1377 期第 9 页、1379 期第 13 页）。上一轮已逐一验证原来的 33 个公告链接（31 个不同 URL）返回 HTTP 200；本轮删除 Contest 和 Program 后，保留其中 31 个公告链接（29 个不同 URL）；以后还需核对内容是否迁移，不能只检查状态码。

## 格式规范

1. **语言与姓名**：页面以英文为主，中文姓名只用繁体「唐梧遷」，置于姓名括号内。英文名统一 Wuqian Tang；引用作者名和正式机构名保持准确。
2. **标题**：栏目与子标题采用 Title Case，例如 About Me、Recent News、Research Interests、Awards & Honors、Education & Experience、Research & Industry、Hobbies。最上方学科介绍是唯一全大写的展示文字：COMPUTER SCIENCE · ELECTRONIC DESIGN AUTOMATION。导航保留 Research；方向名称用 Physical Design Automation。不得用 `text-transform: uppercase` 强制转换子标题。论文题名保持出版方原文，不为统一标题样式改写正式题名。
3. **视觉**：白色背景、深色正文、蓝色链接，系统字体，无远程字体依赖。奖项标题统一 `--ink`、`.9375rem`、550 字重，不按获奖等级改成蓝色。
4. **日期**：页面日期用英文三字母月份加年份，如 Sep 2026、May 2025；时间范围用 en dash（–），持续状态用 Present；Awards、Education、Experience 及相册日期在 – 后固定换行，– 留在首行，两个日期段分别 nowrap，不将月份与年份拆开。资料保存完整的起止年份，如 Jun 2025–Sep 2025；多人次合并奖项在说明中列出实际月份。以证书、官方公告或经过核对的资料为依据。
5. **News**：当前只展示 2026 年，倒序排列，保持短句，右侧为 Latest Updates。句末使用方括号链接到具体图片/奖状或对应公告；媒体在首页弹窗展示，外部网页在新分页打开。不使用 TAPCO 正文跳转。助教新闻筛选正确学期，不把旧学期图片混入新新闻。
6. **奖项**：标题保持普通深色文字。条目末尾同行展示 `Media: [Certificate] [Plaques] [Trophy] [Medal] [Photos] │ News: [Official] [News] [University] [College] [Department]`，只列实际存在的资源，按数量用正确单复数。同类多张合为一个链接；窄屏允许自然换行。浅灰竖线分隔两组，不重复写 news 后缀。多个题目或年份使用 `[Department (Problem A)]` / `[Department (2025)]`。删除 Contest Website / Program Details 类型的链接。Hobbies 只有 [Medal]，照片本身可点击，避免重复 [Photo]。
7. **外部来源**：对应具体奖项与年份，确认本人姓名或队伍。优先官方结果、系所、学院、学校和政府；不把通用首页、其他团队的成绩或旧年份名单当获奖公告。全部 http/https 外部链接使用 `target="_blank" rel="noopener noreferrer"`，即使禁用 JavaScript 也保留此行为。内部锚点正常定位，邮件链接保持 mailto。
8. **论文**：编号 J1 / J2 / C1–C19 保持稳定，作者顺序完整，本人加粗，星号表示 equal contribution。Invited paper、In Chinese 与 To appear 分别按事实使用。除 To appear 外，每篇必须有一个经过核对的 DOI。查不到 DOI 时按用户要求标为 To appear；不得使用相似题目的 DOI。
9. **论文 PDF**：优先正式官方全文或作者提供的可公开最终稿；下载后核对内容，存放 `site/files/papers/`。查看链接用 `files/papers/文件名.pdf`，不得链接其他人的个人网页、远程 PDF 或临时下载 token。保留 PDF 原始字节，在 manifest 记录来源与 SHA-256。
10. **照片**：沿用真实照片，不生成或改写人物。原始照片/PDF 字节与 SHA-256 不变。首页羽毛球照片使用 4:3、`object-position: 50% 53%` 半身裁切；弹窗使用 `crop_top: 0.25` 只裁上方窗帘。方向先遵循浏览器 EXIF，再应用明确核对的 rotation（2022 ICCAD 奖状为 -90°）。图片有准确英文 alt，惰性加载，不在首页提前请求所有奖项图片。媒体点击直接在当前页弹窗，支持翻页、左右键、触控滑动、Escape、焦点返回；保留原相册作为无 JS / Ctrl 或 Cmd 点击回退。只有 View Original 查看链接，不添加下载按钮或 download 属性。
11. **Teaching**：每门课程包含正式英文课程名、教师、所属系所或学院和学期；教师在前，系所在后，以 · 分隔。不同学院课程不能统一写成 CS。助教奖项括号采用 `Spring 2025` / `Fall 2025` 格式，表示教学对应学期；证书学年度第 1 学期转换为该学年开始公历年的 Fall，第 2 学期转换为下一公历年的 Spring。不得把次年 2 月或暑假颁发日期当成教学学期。Awards 日期列为颁发月份，说明与相册另注明实际学期。
12. **响应式与可访问性**：电脑两列，手机单列，导航可展开；320px 起无横向溢出。保留语义标题、可见键盘焦点、跳转链接、对话框标签，以及无 JavaScript 的基本阅读和图片链接。
13. **公开范围**：允许本次明确授权的奖状、奖杯、奖牌、照片和具体最终论文；不公开身份证件、成绩单、申请表、推荐信、录取通知、学生奖惩记录、未授权稿件或整个资料目录。公开 CV 不含电话号码。

Hobbies 用词参考了 [Siyuan Jiang 的学术主页](https://siyuanj.github.io/) 中同名栏目；它直接表达爱好，适合当前内容。网站不需要附上这条用词参考。

## 文件与更新步骤

| 文件 | 用途 |
| --- | --- |
| `content/profile.json` | 论文、奖项、月份、官方链接、课程和经历数据 |
| `content/homepage.html` | 首页结构和 About Me / Hobbies 文案 |
| `content/award-gallery.html` | 相册模板 |
| `content/public-assets.json` | 明确审核的公开文件路径、来源和 SHA-256 |
| `site/assets/css/main.css` | 响应式布局、字体、颜色、照片展示裁切 |
| `site/assets/js/main.js` | 导航、首页/相册弹窗、预览方向与裁切、触控翻页、折叠条目与返回定位 |
| `scripts/build.py` | 生成页面并检查公开目录、DOI 和本地 PDF 链接规范 |
| `content/Wuqian_Tang_Public_CV.tex` | 公开 CV 可编辑源文件 |
| `preview/` | 设备预览、浏览器与可访问性验证结果，未部署到网站 |

更新流程：修改数据或模板 → 只复制审核过的公开文件并更新 manifest → 生成页面 → 检查 → 预览 → 只提交本网页仓库的变更 → 推送 master → 检查 GitHub Actions 与线上版本。

```sh
python3 scripts/build.py
python3 scripts/build.py --check
node --check site/assets/js/main.js
git diff --check
python3 -m http.server 8765 --bind 127.0.0.1 --directory site
```

不要直接修改生成的 `site/index.html` 或 `site/awards/*.html` 来保存正文变化；它们会被下一次 build 覆盖。不要从网页仓库的父目录执行会混入个人资料的 `git add`。

## 本次验收

主页验证覆盖 1440×1000、1024×768、820×1180、768×1024、390×844、320×568、844×390；包含菜单、展开论文、图片弹窗、200% 字体和禁用 JavaScript。相册验证覆盖电脑、平板、手机和 320px 手机，包括 PDF 预览、左右键翻页、关闭、返回折叠奖项定位和无 JavaScript 原图访问。

本轮新增验证涵盖首页所有 86 份资源链接的预览（另单独检查内嵌羽毛球照片）、资源顺序、所有外部链接的新分页属性与实际打开行为、助教新闻学期筛选、时间范围固定换行、两种羽毛球裁切、手机横屏弹窗边界、键盘/触控翻页和无 JavaScript 相册回退。桌面与手机首页/相册及打开的桌面弹窗 WCAG 自动扫描均无报告项。33 个本地 HTML 页面的 524 处本地链接与图片引用、95 个外部锚点的新分页属性、公开文件清单及原始 SHA-256 均验证通过。

结果见 `preview/validation.json`、`preview/gallery-validation.json`、`preview/revision-validation.json`、`preview/accessibility.json`；设备截图与裁切/奖状弹窗截图位于 `preview/`。部署后另用匿名访问核对首页、样式、脚本、31 个相册、5 份论文 PDF 和所有 116 份 manifest 资产。屏幕尺寸模拟与自动扫描不能替代真实设备或人工阅读。

部署结果可在 [GitHub Pages 工作流](https://github.com/wuqian-tang/wuqian-tang.github.io/actions/workflows/pages.yml) 查看；本记录随此次 master 提交发布。以后继续更新时，以最新成功工作流和线上实际文件为准。
