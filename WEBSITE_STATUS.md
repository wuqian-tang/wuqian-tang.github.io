# 个人主页进度与维护规范

更新日期：2026-10-05。本文用于继续维护当前网站；以后开始更新前，先阅读本文，再检查实际仓库和线上内容。

- 网站：[wuqian-tang.github.io](https://wuqian-tang.github.io/)
- 公开仓库：[wuqian-tang/wuqian-tang.github.io](https://github.com/wuqian-tang/wuqian-tang.github.io)
- 发布分支：`master`；GitHub Actions 只发布 `site/`。
- 用户已授权上线、公开网页仓库和继续修改当前网站。原始个人资料仓库保持 private。

## 补充 CUHK 学院获奖公告（2026-10-05，最新）

- 用户指定将 [CUHK 工程学院公告](https://www.erg.cuhk.edu.hk/erg/node/2955)加入 `First Place (Problem C), ICCAD CAD Contest`（Oct 2025，`iccad-contest-2025-c`），紧接现有 `College`。随后确认按照官方 `Faculty of Engineering` 名称，将标签从 `College2` 改为 `Faculty`。
- 首页和该奖项独立相册同步为 `Announcements: [Official] [College] [Faculty] [Department]`，外部链接继续在新分页打开；可访问名称注明 CUHK Faculty of Engineering。
- 该公告报道 2025 Problem C 冠军，不关联 Problem A 亚军。获奖公告合计 35 处引用、30 个不同 URL；首页更新日期与 sitemap 日期同步到 2026-10-05。
- 本轮通过构建、静态一致性和链接顺序检查后，推送 master 并核对 GitHub Pages 工作流及线上首页、相册。多语言方案仍暂存于本地 `MULTILINGUAL_NOTES.md`，未加入网站。

## Google Search Console 所有权验证（2026-10-04，上一版）

- 用户提供了 Google Search Console 的 HTML 标签，已将 `google-site-verification` 加入 `content/homepage.html` 的 `<head>`，由构建脚本写入公开首页。后续更新必须保留此标签。
- 构建和静态检查通过；模板及生成首页都恰有一个验证标签，位置与代码正确，除新增标签外页面内容与上一版一致。由 master 推送触发 GitHub Pages 发布，完成后核对匿名访问的线上首页。
- 对应网址前缀资源为 `https://wuqian-tang.github.io/`。标签发布后，由用户回到 Search Console 点击 Verify；网站加入标签不代表 Google 已确认所有权或完成收录。
- 验证成功后，由用户在 Search Console 提交 `https://wuqian-tang.github.io/sitemap.xml`，通过网址检查查看首页状态并请求编入索引。Google 的验证、抓取与收录状态以 Search Console 实际结果为准。

## 精选条目调整（2026-10-04，上一版）

- 甲骨文论文 `J2 · The Lunar-Month-Interval Algorithm for Dating Oracle Bone Inscriptions` 移入 Publications → More 的 2025 年分组；当前为 5 篇精选论文、16 篇 More。
- `Silver Award, ICPC Asia Taipei–Hsinchu Regional`（Nov 2020）移入 Awards & Honors → More，放在 Dec 2020 条目之后；当前为 17 项精选奖项、15 项 More。
- 两项的题名、说明、日期、DOI / PDF / Journal / BibTeX、奖状、纪念牌及新闻链接全部沿用原记录。稳定锚点仍为 `#paper-j2` 和 `#award-icpc-2020`，相册 URL 保持 `awards/icpc-2020.html`。
- 本轮针对性验收见 `preview/more-selection-validation.json`：1440px、820px、390px、320px 下主列表 / More 数量和两项目标位置正确，收起时隐藏、展开后显示，More / Less 标签与深链接自动展开正常，无横向溢出。电脑及手机上的 J2 BibTeX 实际复制、ICPC 奖状弹窗翻页和相册返回定位通过；手机禁用 JS 时原生展开、引文及相册回退通过。
- 已刷新电脑、平板、手机首页及论文 / 奖项展开预览。构建、JS 语法及 diff 空白检查通过；87 份媒体的唯一归属、引用代码、公开资产清单、CV 和 ICPC 相册字节保持一致。本轮由 master 推送触发 GitHub Pages 发布，维护时继续以工作流及线上页面核对为准。

## 获奖说明、RTL 表述与 More / Less 修订（2026-10-04，上一版）

- 用户已确认本轮方案并授权开始实施。会议比赛说明不再重复会议名称、ACM / IEEE 或会议简称，直接列题目或比赛内容。ICCAD CAD Contest 的 6 个 Problem 条目只保留原有完整题名；ISPD 仅写 Post-placement buffering and sizing。
- MLCAD 描述改为 `LLM-based Algorithm Discovery for Timing Optimization`，与[官方比赛仓库](https://github.com/ASU-VDA-Lab/MLCAD26-Contest)题名一致。
- IWLS 描述采用已查看的证书中团队方案题名：`LLM-based heterogeneous portfolio of AIG seeds, refined by evolutionary multi-tool synthesis and Pareto search.`，含句末句点。来源为 `site/assets/awards/iwls-2026/certificate-1.jpg`；这是本人团队的方案题名。
- 2024 / 2025 CADathlon 描述统一为 `ACM/SIGDA CADathlon Programming Contest · Olympic Games of EDA`，Programming 按奖杯正确拼写；不加英文引号或「」。两年的奖杯均印有比赛全名，ACM/SIGDA 是该完整比赛名称的一部分，按用户要求保留。后半句采用 [ICCAD 官方介绍](https://iccad.com/2026/cadathlon-at-iccad-2026)对 CADathlon 的称呼。
- Student Scholar Program Award 仍在 More，只写 `IEEE/ACM International Conference on Computer-Aided Design`，去掉参与及差旅支持描述。非会议比赛的奖项沿用机构及已确认的描述例外。共更新 12 个获奖记录，首页和相册说明同步生成，34 处公告引用及所有媒体归属保持一致。
- Research Interests 第二个方向标题为 `Logic Synthesis & RTL Recovery`，不带 Optimization。说明为 `Developing optimization methods for logic synthesis and recovering functionally equivalent RTL representations from gate-level circuits.`。代表工作完整保留 `CB-EVO · TODAES 2026; DATE 2024`。About Me 与搜索 description 同步使用 `logic synthesis and RTL recovery`；正式论文题名、作者、DOI 和 BibTeX 保存出版原文。
- Publications 和 Awards 的原生展开控件：收起显示 More ＋，展开显示 Less −；原位置、字号、留白保持一致，不显示数量。两个文本标签由原生 details 的 open 状态控制，从相册返回、直接访问折叠条目的锚点以及禁用 JS 时均可同步；可访问名称中附带隐藏的 publications / awards and honors 上下文，并随可见文字切换。
- 首页和全部相册的 CSS / JS 缓存版本更新为 `20261004-wording-disclosures`。本次仅增加 3 条文本状态 CSS 规则，复用原有 +/- 图形与原生展开行为。
- 当前栏目顺序、18 项主列表 / 14 项 More、33 个相册、87 份媒体与 206 项公开资产 manifest 均保持一致。最新验收记录为 `preview/wording-disclosure-validation.json`：7 种屏幕尺寸、12 个改动相册在桌面及 320px 手机的 24 次排版检查、8 次 WCAG 扫描、3 种无 JS 尺寸全部通过；More / Less 的点击、Enter / Space 键盘切换、控件宽高、加减符号、原生无障碍名称及展开状态、直接锚点和相册返回均通过。实际 BibTeX 剪贴板、无 JS 引文展开、图片弹窗及回退通过；35 个 HTML 页面的 750 处本地引用及 101 个外部新分页锚点核对通过。

- 已刷新电脑、平板、手机首页，Awards 主列表及展开列表、Publications 展开列表，以及 IWLS / CADathlon 独立相册的电脑和手机预览。静态构建、JS 语法及 diff 空白检查通过；本轮随 master 提交经 GitHub Pages 工作流发布，后续维护仍须核对最新工作流及实际线上页面。

## 栏目与获奖条目整理（2026-10-04，上一版）

- 已按用户最终审核实施。正文顺序为 About Me → Recent News → Research Interests → Publications → Education & Experience → Awards & Honors → Teaching → Hobbies；Education & Experience 放在 Publications 之后。顶部导航同步为 About / Research / Publications / Experience / Awards / Teaching / Hobbies。
- Publications 与 Awards & Honors 右侧统一显示 `Selected`，不带句点；Publications 下方仅显示 `* denotes equal contribution.`，不加括号。删除 Publications 右侧的 Google Scholar，侧栏链接保留。论文与奖项的展开控件均只显示 `More`，不显示数量；可访问名称分别是 More publications 与 More awards and honors。
- Awards 主列表 18 项，More 14 项。Student Scholar Program Award、全部 Honorable Mention、Mainland China Student Scholarship 放在 More。JSON 的 `earlier_awards` 键保留以兼容构建，但含义已改为 More，不能再按“全部较早”处理。全部奖项合计 32 个条目，另有羽毛球爱好相册，合计 33 个相册页。
- 获奖说明统一为 `机构 · 描述`；会议主办比赛用会议全名。铭传 Distinguished Alumnus / Outstanding Contribution 两项仅写 `Department of CSIE, Ming Chuan University`，保持 CSIE 缩写；Synopsys 奖学金仅写 `Synopsys Taiwan & Taiwan IC Design Society`，不写 TICD 括号简称；陆生奖学金仅写 `National Tsing Hua University`。上述四项不追加描述或分隔点。EDAthon 写 IEEE CEDA Hong Kong Chapter，再接比赛描述；MLCAD 描述为 Agentic algorithm discovery for timing-power co-optimization。
- CAD Contest 不同 Problem 拆成独立条目，用官方题目全名，不以分号合并。2025 Problem C 冠军与 A 亚军分别显示；2024 Problem A 亚军在主列表，Problem B Honorable Mention 在 More。2023 Problem A Honorable Mention 也在 More。题名依据官方 [2022 Problems](https://www.iccad-contest.org/2022/Problems.html)、[2023 Problems](https://www.iccad-contest.org/2023/Problems.html)、[2024 Problems](https://www.iccad-contest.org/2024/Problems.html)、[2025 Problems](https://www.iccad-contest.org/2025/Problems.html)，保留原题大小写与用词（包括 2022 的 Circuit 单数）。

| 条目 | 相册 ID / 文件名 | 独立媒体归属 |
| --- | --- | --- |
| 2025 Problem C | `iccad-contest-2025-c` | certificate-2.pdf、plaque-2.jpg、photo-3.jpg、photo-4.jpg |
| 2025 Problem A | `iccad-contest-2025`（保留旧 URL） | certificate-1.pdf、plaque-1.jpg、photo-1.jpg、photo-2.jpg |
| 2024 Problem A | `iccad-contest-2024`（保留旧 URL） | certificate-1.pdf、plaque-1.jpg、photo-1.jpg |
| 2024 Problem B | `iccad-contest-2024-b` | certificate-2.jpg、plaque-2.jpg、photo-2.jpg |

- 上表各文件仍在原有年份的资产目录，预览文件也沿用原路径。已查看对应 6 张照片，按 Problem 分开，没有共同合照；不得把其中任一照片重复分配给另一 Problem。全部 87 份媒体一份不漏、各有唯一归属，原文件、WebP 预览、206 项公开 manifest 均未改字节。
- 公告按实际报道归属：2025 [学院公告](https://cosr.site.nthu.edu.tw/p/406-1536-299166,r11272.php?Lang=zh-tw)只报道 Problem C 冠军，仅关联 C；2024 [校讯第 1379 期第 13 页](https://my.nthu.edu.tw/~nthunews/NTHU1379.pdf#page=13)分别包含本人 Problem A 与 B 的获奖记录，允许关联两项。系所公告分别关联各自 Problem，拆开后标签精简为 Department。同一官方结果页报道同年多个 Problem 时允许各条目使用同一来源，这不表示媒体可以共用。
- 当前共有 34 处获奖公告引用、29 个不同 URL；新增的是拆分条目后对相应同一来源的引用，没有额外加入比赛介绍或项目详情。
- 本次验收通过，记录在 `preview/content-organization-validation.json`：7 种屏幕尺寸均无横向溢出，Selected / More、栏目与导航顺序、长题目换行、教育栏目定位、手机双向滑动和 More 相册返回定位均通过；33 个相册的 87 张预览全部实际解码，电脑／手机 BibTeX 剪贴板内容正确，6 次 WCAG 自动扫描无报告项，无 JavaScript 的 More 和相册回退通过。静态检查核对 35 个 HTML 页面的 750 处本地引用及 101 个外部锚点。首页、奖项相册及网站地图均由构建脚本生成；`build.py --check`、脚本语法和 diff 空白检查通过。
- 本地 Python 3.10 预览服务器的默认 MIME 数据库缺少 WebP，直接打开预览时会当下载处理；验收服务器显式映射为 image/webp 后，无 JS 图片导航通过。已匿名核对 GitHub Pages 同一文件返回 HTTP 200、Content-Type: image/webp；这是本地预览环境差异，不是网站新增下载按钮。
- 最新预览包括 `preview/awards-more-desktop.png` / `awards-more-mobile.png`、`publications-more-desktop.png` / `publications-more-mobile.png` 和 Problem B / C 的独立相册截图；首页电脑、平板、手机及相关栏目截图已刷新。本轮由 master 的 GitHub Pages 工作流发布；继续维护时仍应检查最新工作流及线上实际内容。

## 公开 CV 联系方式更新（2026-10-03）

- 用户确认公开 CV 继续不放电话号码，并明确授权在原邮箱后增加 `mark.wqtang@gmail.com`。
- CV 顶部联系方式单行居中：`wqtang@cs.nthu.edu.tw | mark.wqtang@gmail.com`，字号与原版一致。按用户补充要求，对照原版「电话 | 邮箱」使用普通单空格，移除竖线两侧的 `\quad`；保持原版字号、字体与上下留白。
- 修改 `content/Wuqian_Tang_Public_CV.tex` 后使用 LuaLaTeX 编译，更新 `site/files/Wuqian_Tang_CV.pdf`；仅修改公开 CV，网页简介邮箱保持原样。核对 PDF 仍为 3 页 A4，两邮箱顺序正确，除此之外提取文本与上一版一致。
- 首页 CV 链接使用最新版本参数 `v=20261003-email-spacing`，使浏览器请求更新后的 PDF。
- 用户已明确确认保留本地的奖项行距与 Work Experience 标题间距修改并上线：完整 CV 的奖项行间距为 6.96bp，Work Experience 上方间距为 7.8bp，与其他主栏目一致，保持 3 页。两页版的原有条件分支保留。这次公开源文件与 PDF 同步包含邮箱及已确认的间距调整。

## 当前完成的内容

- 英文主页，姓名为 Wuqian Tang（唐梧遷）；保留原头像、LinkedIn、Google Scholar、公开版 CV。
- Recent News 只保留 2026 年，目前 4 条；右侧使用 Latest Updates。句末加方括号资源链接，移除 TAPCO 的正文跳转。助教新闻仅对应 Spring 2026 的奖状、奖杯与照片。
- 删除 About Me 最后的研究标签、甲骨文研究介绍句和 Technical Skills 栏目；甲骨文论文仍保留在 Publications 中。
- 主栏目与 Education、Work Experience 等子标题统一为 Title Case，取消子标题的 CSS 全大写转换。
- 爱好栏目使用 Hobbies，标题与其他栏目一致；删除 Off the Clock / Personal Interests 引导文字。包含 badminton、swimming、table tennis。
- 羽毛球首页照片为 4:3 半身展示，文字与照片顶端对齐；弹窗只裁去上方 25% 的窗帘区域，保留其余全身照片。[Medal] 放在获奖那句话结尾，移除重复的 [Photo]。原图字节不变，通过 View Original 查看完整原图。
- 首页获奖展示照改为新竹市优秀青年照片第 2 张；保留行健奖照片。IWLS 完整照片仍在对应相册中。
- 王老师主页链接为 `http://nthucad.cs.nthu.edu.tw/~wcyao/`。
- 6 门助教课程先写教师，再写 Department of Computer Science、Department of Electrical Engineering 或 College of Semiconductor Research。
- Teaching 中的助教获奖括号写获奖对应的学期，而不是颁发月份：Excellent 为 Spring 2026；Outstanding 为 Spring 2025、Fall 2025、Spring 2026。已逐张查看奖杯及三张奖状上的学期。
- 33 个奖项相册（32 个 Awards 条目及 1 个爱好相册），含 87 份原始奖状、照片、奖杯、奖牌及纪念牌文件，另有 24 张 PDF 奖状预览。所有原始文件按 SHA-256 校验；除用户授权转正的 2022 ICCAD PDF 外，其余原始字节保持不变，该 PDF 内嵌扫描图像也未重压缩。
- 所有奖项均补上月份；合并条目展示时间范围，正文保留各次获奖月份。Awards 与相册的日期范围在 en dash 后固定换行；Education 和 Work Experience 的日期始终单行，电脑和平板靠右，手机（600px 及以下）放在条目上方靠左。实习经历补全起始年份。
- 奖项标题字体、字号、字重、颜色一致。资源同行排列为 Materials: […] │ Announcements: […]，窄屏自然换行；删除比赛介绍与项目介绍，仅保留 34 处对应的公告引用（29 个不同 URL）。使用完整 Department 标签；不同 CAD Contest Problem 分开，不再需要题目字母后缀。跨年份公告仍可附年份区分。
- Research 标题为 Research Interests，移除 Current Interests，导航仍为 Research；方向名称统一 Physical Design Automation，描述仍对应已有研究。最上方学科介绍全大写。
- 首页奖项资源直接打开弹窗，电脑使用左右两侧圆形箭头，手机将箭头与张数放到照片下方；支持滑动淡入淡出动效、左右键、双向触控滑动、Escape 和焦点返回；右上角用圆形 × 图标关闭，没有 Previous / Next / Close 可见文字。PDF 奖状使用预览；保留相册页作为无 JavaScript 回退。2022 ICCAD 奖状的本地源 PDF、网站 PDF 和预览都已转正，删除了额外的页面旋转配置；其他图片遵循正确 EXIF 方向。
- 所有外部链接使用新分页及 noopener/noreferrer；页面没有 download 属性或下载按钮。保留普通 CV / 论文 PDF 查看链接与 View Original。
- 删除 My name is highlighted;，本人作者名仍加粗。
- Publications 共 21 篇：18 篇有经过核对的 DOI，3 篇标记 To appear。所有页面上的论文 PDF 链接都指向本仓库。
- 已本地托管 5 篇论文 PDF：J1 CB-EVO、J2 甲骨文论文、C1 DATE 2024、C15 HyPAS、C17 TAPCO。TAPCO 仅提取了最终论文 PDF，没有公开申请目录或其他申请资料。

## 最新一轮修改（2026-10-03）

- 本地 2022 ICCAD 奖状改为默认正向阅读，使用 PDF 页面方向元数据而非重新扫描或编辑图片。与原文件旋转后的渲染逐像素一致，内嵌图像流 SHA-256 完全相同。
- 本地奖状已提交并推送到 private 仓库 `wuqian-profile` 的 `main`，提交 `1337bbb`；该次提交只包含这一份奖状。网站副本和 JPEG 预览同步更新，公开 manifest 更新两个文件的 SHA-256。
- 弹窗的翻页控制在电脑位于图片左右两侧，在手机位于图片下方，采用圆形轻描边按钮和细线 chevron SVG，只有箭头；关闭按钮采用同类圆形 X 图标。三个按钮都有英文 aria-label，手机触控区域至少 44px，支持左右滑动翻页。张数留在底部，单张图隐藏翻页控制及计数。
- Hobbies 的 [Medal] 直接放在羽毛球获奖句末，不再使用单独的资源行。
- 原头像右上角新增与左下角相同颜色和线宽的角线；最新调整将右上角缩短至左下角的一半，宽高分别为 29px / 58px。
- 手机（600px 及以下）将 Hsinchu, Taiwan 放到邮箱下一行，地点图标与邮件图标、地点文字与邮箱文字分别左对齐；姓名与院校信息仍在头像右侧。
- 分组标题采用 Materials / Announcements，保留现有资源顺序、方括号和浅灰竖线。
- 甲骨文论文原有链接顺序为 DOI、PDF、Journal，新加的 BibTeX 复制按钮在最后；正式题名仍为 The Lunar-Month-Interval Algorithm for Dating Oracle Bone Inscriptions。
- 经历子标题改为 Work Experience，覆盖研究助理与企业实习。Education / Work Experience 日期在电脑和平板上靠右、手机上靠左，均单行显示。博士时间为 Sep 2023 – Expected Jul 2027，下方仅保留导师信息。
- 首页、相册页首使用经典繁方篆「唐」原始字形，浏览器 favicon 使用用户确认的小尺寸 B 版本。两者均为浅蓝色方印，无白色内框、不依赖设备字体或远程字体请求。来源信息见 `THIRD_PARTY_NOTICES.md`。

## 小尺寸图标、图片性能与分享卡片（2026-10-03）

- 用户已确认部署本地预览中推荐的 B 图标。原版页首 35px 字形另存 `site/assets/brand.svg`，字节与上一版本完全相同；浏览器改用 16px 网格优化的 `favicon.svg`，同时提供原生 16×16 / 32×32 PNG。背景继续 `#4E7DC3`，白字、无内框；首页、31 个相册与 404 同步更新版本参数 `20261003-small-tang`。
- 为全部 87 份相册媒体生成 WebP，包括普通 JPEG 与 24 张 PDF 预览。普通图片最长边 1600px、质量 86，奖状 1800px、质量 90，羽毛球 1400px；预览应用正确 EXIF 方向，不携带原 EXIF 信息。公开 manifest 新增 87 个派生文件，记录来源、来源 SHA-256、尺寸与编码参数。
- 可展示的预览资源合计从 109,521,049 bytes 降为 16,000,228 bytes，减少 85.39%。羽毛球从 4,796,730 bytes 降为 137,866 bytes（787×1400）。这些是预览资源大小；原图和 PDF 仍保留，网站文件总量会因新增预览增加，不能写成部署目录减少 85%。
- 首页三张活动照片复用相册 WebP，不重复生成文件；首页羽毛球点击后才加载原 JPEG，并继续裁掉上方窗帘。奖项弹窗和相册默认显示 WebP，View Original 查看原 JPEG / PDF。上一版本 manifest 中 116 份已有资产的 SHA-256 均保持不变。
- 新增 `site/assets/images/social-preview.png`，固定 1200×630、118,428 bytes，包含原头像、Wuqian Tang、National Tsing Hua University (NTHU) 与 Electronic Design Automation · Logic Synthesis · AI for EDA；编辑源是 `content/social-preview.html`。首页及全部相册补齐 Open Graph 图片尺寸、替代文本和 Twitter summary_large_image。
- ORCID 已通过官方公开记录核对：姓名 Wuqian Tang、CB-EVO 的 `10.1145/3779431` 与 GLSVLSI 的 `10.1145/3716368.3735193` 均匹配，出版方提交的 Crossref 作者记录也一致。链接 `https://orcid.org/0009-0008-5042-5062` 加入个人链接和 Person `sameAs`；来源为 `https://pub.orcid.org/v3.0/0009-0008-5042-5062/record`，核对日期 2026-10-03。
- Teaching 导航位于 Experience 与 Hobbies 之间，复用已有桌面导航和手机菜单。修复手机横屏的当前栏目高亮：观察区域改按屏幕高度计算像素，同时包含锚点留白，窗口尺寸改变后重新计算；百分比 rootMargin 按宽度解析的依据见 [Intersection Observer 规范](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin)。

## LINE 预览、分享图及手机导航修订（2026-10-03）

- 用户在 Android LINE 测试原主页地址时有标题和说明、没有图片；在本轮图片修订部署前，新发 `?share=line-20261003a` 后确认图片出现。网站静态 og:title / og:description / og:image 完整，模拟 Linespider 请求的主页、图片均返回 HTTP 200，PNG 为 RGB、1200×630、无透明通道。新地址与原地址返回同一份页面，这支持旧网址预览缓存是主要原因；不能声称已从 LINE 服务端清除原地址缓存或承诺固定刷新时间。
- 根据用户最后补充，分享图只显示英文姓名 Wuqian Tang，不显示括号中文；网页简介中的中文姓名保留。学校上方增加 Department of Computer Science。头像由 228×333 放大到 270×394；英文姓名 70px → 82px、博士身份 32px、系所 30px、学校 34px、研究方向 30px；外侧留白收紧到左右 48px、顶部 40px。研究方向移除 Logic Synthesis，统一单行为 Electronic Design Automation · AI for EDA。照片与文字的间距从预览的 38px 增为 84px；照片向右移 20px，左侧起点为 68px。左上 Homepage 从 23px 增为 32px，底部网址和地名从 23px 增为 30px；全部文字无截断。
- 分享标题为 `Wuqian Tang | Homepage`；摘要为 `CS Ph.D. Candidate at National Tsing Hua University.`。删除 Learning and optimization 及后续研究介绍；Open Graph 与 Twitter 描述一致。分享图左上角也简化为 Homepage。浏览器页面标题及搜索 description 保持原来的学术信息。
- 首页和全部 31 个相册改用版本化图片 `assets/images/social-preview-20261003-v2.png`，1200×630、158,689 bytes；原 `social-preview.png` 同步为相同内容，保留旧地址可访问。两个文件的 SHA-256 更新到 manifest，清单目前 205 份。新版 LINE 测试地址为 `https://wuqian-tang.github.io/?share=line-20261003-v2`；平台已生成的旧消息卡片不一定追随网页立即更新。
- 手机／平板菜单布局（999px 及以下）删除可见 Menu，只留三横线；按钮 46×46px，Open / Close navigation menu 的 aria-label 随状态更新。向上滑动阅读页面下方时隐藏整条页首导航，往下拖动返回上方时显示；260ms 缓动平移、不改变正文布局，12px 累积阈值避免微小滑动导致闪动。展开菜单时固定显示，关闭后恢复自动收放；靠近页面顶部、键盘焦点进入页首时也显示。减少动态效果时取消动画；桌面保持显示，相册页首采用相同手机收放行为。
- 首页和相册的 CSS / JS 地址加版本参数 `20261003-mobile-nav`，使新 HTML 请求本轮样式与脚本。

## 原网址分享兼容性补充（2026-10-03）

- 正常分享地址始终为 `https://wuqian-tang.github.io/`，不带查询参数；`?share=...` 仅用于诊断平台缓存。用户确认上一轮部署后原网址在 Android LINE 新发消息仍只有文字、没有图片，而之前新参数地址可出图。两者 HTTP 200，原始 HTML 与分享信息逐字节相同；这支持旧网址的预览缓存是主要原因，不能把参数写成网站的永久分享要求。
- 首页与全部 31 个相册改用同一份绝对 HTTPS 图片 `assets/images/social-preview-20261003-v3.jpg`，尺寸 1200×630、122,843 bytes。从用户已确认的 v2 PNG 编码为 RGB JPEG、quality 95、4:4:4、optimized，无 EXIF；画面和布局不变，体积减少 22.59%。两份 PNG 保留访问，既有 205 份 manifest 资产 SHA-256 均不变，新增 JPEG 后清单 206 份。
- Open Graph / Twitter Card 使用相同图片，增加 `og:image:secure_url`、`og:locale`、OG 命名空间和一致的 `image_src` 回退；尺寸、MIME、alt 均明确写入静态 head，不依赖 JS / cookie / 登录。分享对外地址、canonical 和 og:url 均维持干净的原网址，不能用 JS 重定向或永久查询参数制造缓存刷新假象。
- 浏览器标签页标题按用户追加要求改为 `Wuqian Tang | Homepage`，与首页 Open Graph / Twitter 标题一致。Homepage 按英文单词格式仅 H 大写；搜索 description 继续保留研究简介。
- 已核对 [LINE 官方 FAQ](https://developers.line.biz/en/faq/)：LINE 仅读 og:title、og:description、og:image；[Slack 官方文档](https://docs.slack.dev/messaging/unfurling-links-in-messages/)读取 OG / Twitter Card；[OG 规范](https://ogp.me/)定义 HTTPS 图片、类型、宽高和 alt。Meta [网站管理员文档](https://developers.facebook.com/documentation/sharing/webmasters)说明图片缓存与更新图片 URL、提供分享偵錯工具；JPEG、PNG 均为支持格式，不能称原 PNG 无法兼容。
- 以爬虫 User-Agent 请求只能核对本站响应，不等于已在各平台真实发送或显示卡片。LINE 历史 Page Poker 域名在当前环境无法 DNS 解析，未找到可用的公开刷新入口；不承诺固定更新时间。Meta Sharing Debugger 的匿名页面要求登录 Facebook，LinkedIn Post Inspector 也须用户自己的平台登录；没有执行平台缓存刷新，且刷新 Meta / LinkedIn 不能声称清除了 LINE 缓存。
- 最新静态元数据、图片格式与匿名网络响应验收保存于 `preview/social-compatibility-validation.json`。后续实际平台测试应新发原网址、记录平台与设备，明确区分网站抓取通过和用户看到卡片；不要一直推荐参数地址替代正式网址。

## BibTeX 引用复制（2026-10-03）

- 21 篇论文全部提供 BibTeX，Selected Publications 与 More Publications 均覆盖。按钮统一位于每篇资源行末尾，包括甲骨文论文 Journal 之后；不调整原有链接顺序。
- 按钮沿用蓝色细边框、小圆角，左侧 14px 细线叠纸 SVG。最新样式将图标与文字间距缩至 0.2rem，内边距与 DOI / PDF 统一为上下 0.04rem、左右 0.45rem；移除 88px 最小宽度，仅在标签内为 BibTeX / Copied 保留所需文字宽度。成功复制后显示勾号与 Copied，2 秒后恢复，宽高不变；手机端资源控件至少 44px 高。复制直接使用内嵌引用文本，不发起外部请求、不跳转、不提供下载按钮。
- 复制失败或浏览器缺少 Clipboard API 时，展示与现有弹窗配色一致的 BibTeX Citation 窗口，列出论文题名与只读引用文本，自动选中代码，提供 Copy 重试、圆形关闭按钮与 Escape；关闭后焦点返回该篇按钮。更换论文或关闭窗口时清除旧的复制反馈，防止新引用显示上一次的 Copied。
- 禁用 JavaScript 时通过原生 details 展开代码，不展示失效的复制按钮。缺少原生 dialog 支持时也回退到条目中的引用文本。
- 数据保存于 `content/citations.json`，每篇包含完整 BibTeX、核对日期和来源。15 篇根据出版方提交的 Crossref 元数据核对作者、题名、刊会名及页码；J1 的 Article 119 补查正式 PDF。TAPCO、HyPAS 与甲骨文论文使用仓库中的最终 PDF；3 篇 To appear 使用作者已核对的列表，不补造 DOI 或页码。
- 作者用 `Family, Given and ...`，删除 equal-contribution 星号，保留作者顺序与真实拼写；重音用 LaTeX 转义，标题加括号保护原大小写。甲骨文论文采用 PDF 中正式英文题名与英文作者名，注明 In Chinese；期刊第 15 期保存为 number，不虚构 volume。待刊论文统一 `note = {To appear}`。TAPCO 只确认 8 pages，不把篇幅当成全刊页码。
- 后续论文正式上线时，同步更新 `content/profile.json` 与 `content/citations.json`，重新核对 DOI、页码、文章编号及待刊说明。构建要求引用与 21 个论文 ID 完全对应、引用键唯一、必需字段完整、DOI 一致、来源与核对日期存在。

## 图标候选与弹窗动效（2026-10-03）

- 用户希望将「遷」换成更方正的小篆「唐」，并要求先提供多种字体的本地图片以供选择。已准备 A 全字庫說文解字、B 崇羲篆體、C 華康新篆體、D 文道小篆體，均从真实字体轮廓渲染，并展示 35px / 32px / 16px 大小。来源、文件摘要和使用条件保存在本地 `preview/tang-icon-options/`；该目录未推送、未部署，也没有完整字体进入公开仓库。
- 当前工作目录另存 `唐字小篆_字体对比.png` 和 A–D 四张独立预览图，供用户直接选。用户随后提供 `preview/tang-icon-options/image.png`，改选经典繁方篆；不把系统回退字体作为小篆候选。A / B 有开放许可，C / D 使用官方试看资源，正式发布时需核对相应使用许可。
- 图标背景已从 `#2458AD` 调浅为 `#4E7DC3`，只调整方印背景，不改正文链接色；同时更新 favicon 版本参数。候选对比图另列 `#3D6FB9` / `#4E7DC3` / `#638ECF` 供比较。
- 手机端（600px 及以下，以及 999px 及以下且高度不超过 500px 的横屏）将左右箭头移到照片下方，中间是张数，查看原图位于下一行，照片无遮挡。电脑和平板宽屏继续使用照片两侧箭头；单张图隐藏翻页控制。
- 两端翻页使用 100ms 淡出、180ms 淡入和 16px 方向位移，图框高度过渡 200ms。先解码下一张，再切换；加载较慢时保留当前图，连续点击只呈现最后一次请求。减少动态效果设置下关闭动画。
- 修复点击事件对目标的判断：仅点击对话框之外才关闭，不会因为键盘激活翻页按钮的点击坐标为零而误关闭。关闭或重新打开时取消未完成的图片请求及动画，避免旧照片覆盖新相册。
- 已按用户提供的参考图改用经典繁方篆「唐」。原字体来自 ibiblio 的 `jdfzhuanf.zip`，名称、版本和版权元数据均核对，提取 U+5510 / glyph 4336 的原始轮廓，统一缩放为方印，不放大旧截图。SVG 背景为 `#4E7DC3`，字形为白色；删除内框，更新缓存版本为 `20261003-tang`。字体软件只保存在本地候选目录，不进入公开仓库。来源及 SHA-256 见 `THIRD_PARTY_NOTICES.md`。当前目录保存最终预览、1024px PNG 和 SVG，候选目录另有 512px PNG；最新展示预览同步存到 `preview/brand-preview.png`。

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

ISPD 2026 通用比赛页的当前获奖名单与本人证书不一致，因此暂不作为获奖证明链接；使用本人证书和清华资工系公告。清华电资学院部分旧公告已跳转首页，已改用保留对应公告的清华官方校讯 PDF（1377 期第 9 页、1379 期第 13 页）。上一轮已逐一验证原来的 33 个公告链接（31 个不同 URL）返回 HTTP 200；2026-10-03 删除 Contest 和 Program 后，保留其中 31 个公告链接（29 个不同 URL）；2026-10-04 拆分 CAD Contest Problem 后为 34 处引用、29 个不同 URL。以后还需核对内容是否迁移，不能只检查状态码。

## 格式规范

1. **语言与姓名**：页面以英文为主，中文姓名只用繁体「唐梧遷」，置于姓名括号内。英文名统一 Wuqian Tang；引用作者名和正式机构名保持准确。
2. **标题**：栏目与子标题采用 Title Case，例如 About Me、Recent News、Research Interests、Awards & Honors、Education & Experience、Work Experience、Hobbies。最上方学科介绍是唯一全大写的展示文字：COMPUTER SCIENCE · ELECTRONIC DESIGN AUTOMATION。导航保留 Research；方向名称用 Physical Design Automation。 第二个方向为 Logic Synthesis & RTL Recovery；About Me 和搜索摘要使用 logic synthesis and RTL recovery，保留 DATE 2024 代表工作。不得用 `text-transform: uppercase` 强制转换子标题。论文题名保持出版方原文，不为统一标题样式改写正式题名。
3. **视觉**：白色背景、深色正文、蓝色链接，系统字体，无远程字体依赖。奖项标题统一 `--ink`、`.9375rem`、550 字重，不按获奖等级改成蓝色。头像右上角线宽高均为 29px，左下角均为 58px；两处颜色均为 `#B5CBEA`、线宽均为 2px，形成非对称装饰。
4. **日期**：页面日期用英文三字母月份加年份，如 Sep 2026、May 2025；时间范围用 en dash（–），持续状态用 Present；Awards 和相册日期在 – 后固定换行，– 留在首行，两个日期段分别 nowrap，不将月份与年份拆开；Education / Work Experience 日期在电脑和平板靠右、手机（600px 及以下）放在条目上方靠左，始终单行，横杠两侧保留空格，不插入 br。资料保存完整的起止年份，如 Jun 2025–Sep 2025；多人次合并奖项在说明中列出实际月份。以证书、官方公告或经过核对的资料为依据。
5. **News**：当前只展示 2026 年，倒序排列，保持短句，右侧为 Latest Updates。句末使用方括号链接到具体图片/奖状或对应公告；媒体在首页弹窗展示，外部网页在新分页打开。不使用 TAPCO 正文跳转。助教新闻筛选正确学期，不把旧学期图片混入新新闻。
6. **奖项**：展开控件收起为 More ＋、展开为 Less −，可访问名称与可见文字同步。右侧标注 Selected，主列表显示精选条目，其余放入 More；More 中含 2020 ICPC 银牌、所有 Honorable Mention、Student Scholar Program Award 和 Mainland China Student Scholarship，不限于较早年份。标题保持普通深色文字。一般说明采用 `机构 · 描述`；会议比赛因标题已有简称，说明仅保留完整题目或比赛内容，不重复会议名称。MLCAD / IWLS 采用本页最新确认的题名；CADathlon 为 `ACM/SIGDA CADathlon Programming Contest · Olympic Games of EDA`，无引号；Student Scholar Program Award 只保留 IEEE/ACM ICCAD 会议全名。CSIE 系友／贡献奖、Synopsys 奖学金、陆生奖学金按本页例外仅保留机构。CAD Contest Problem 独立成条，用完整官方题名；每份照片、奖状、纪念牌只归属正确的 Problem，禁止重复挂载。条目末尾同行展示 `Materials: [Certificate] [Plaques] [Trophy] [Medal] [Photos] │ Announcements: [Official] [News] [University] [College] [Department]`，只列实际存在的资源，按数量用正确单复数。同类多张合为一个链接；窄屏允许自然换行。Materials 表示可查看的奖状、奖杯、奖牌、纪念牌及活动照片；Announcements 表示与该奖项对应的官方结果、报道和公告。浅灰竖线分隔两组，不重复写 news 后缀。不同 CAD Contest Problem 已分条，使用 `[Department]` 即可；同一条目多个年份可用 `[Department (2025)]` 区分。删除 Contest Website / Program Details 类型的链接。Hobbies 只有句末的 [Medal]，不单独起一行；照片本身可点击，避免重复 [Photo]。
7. **外部来源**：对应具体奖项与年份，确认本人姓名或队伍。优先官方结果、系所、学院、学校和政府；不把通用首页、其他团队的成绩或旧年份名单当获奖公告。全部 http/https 外部链接使用 `target="_blank" rel="noopener noreferrer"`，即使禁用 JavaScript 也保留此行为。内部锚点正常定位，邮件链接保持 mailto。
8. **论文**：甲骨文论文 J2 放在 More 的 2025 年分组。右侧仅标注 Selected，侧栏保留 Google Scholar，不重复在栏目右侧出现。标题下说明严格为 `* denotes equal contribution.`，不加括号或 Selected work.；更多论文的原生展开按钮收起为 More ＋、展开为 Less −，不显示篇数，可访问名称应能区分论文与奖项并跟随状态。编号 J1 / J2 / C1–C19 保持稳定，作者顺序完整，本人加粗，星号表示 equal contribution。Invited paper、In Chinese 与 To appear 分别按事实使用。除 To appear 外，每篇必须有一个经过核对的 DOI。查不到 DOI 时按用户要求标为 To appear；不得使用相似题目的 DOI。
9. **论文 PDF**：优先正式官方全文或作者提供的可公开最终稿；下载后核对内容，存放 `site/files/papers/`。查看链接用 `files/papers/文件名.pdf`，不得链接其他人的个人网页、远程 PDF 或临时下载 token。保留 PDF 内容，在 manifest 记录来源与 SHA-256；如用户授权修改页面方向，还需记录 normalization。
10. **照片**：沿用真实照片，不生成或改写人物。原始照片字节保持不变；PDF 如需转正，必须得到用户明确授权，只调整页面方向而不改扫描内容，并更新公开清单中的 SHA-256。首页羽毛球照片使用 4:3、`object-position: 50% 53%` 半身裁切；弹窗使用 `crop_top: 0.25` 只裁上方窗帘。方向先遵循正确 EXIF；2022 ICCAD 源 PDF 设置 270° 页面方向并重新生成正向预览，页面不再叠加旋转。图片有准确英文 alt，惰性加载，不在首页提前请求所有奖项图片。媒体点击直接在当前页弹窗，支持电脑两侧 / 手机图下的图标翻页、左右键、双向触控滑动、右上角图标关闭、Escape、焦点返回；翻页先解码新图，再用 100ms 淡出与 180ms 淡入配合 16px 水平位移，图框高度过渡 200ms；系统开启减少动态效果时取消这些动画；保留原相册作为无 JS / Ctrl 或 Cmd 点击回退。只有 View Original 查看链接，不添加下载按钮或 download 属性。
11. **Teaching**：每门课程包含正式英文课程名、教师、所属系所或学院和学期；教师在前，系所在后，以 · 分隔。不同学院课程不能统一写成 CS。助教奖项括号采用 `Spring 2025` / `Fall 2025` 格式，表示教学对应学期；证书学年度第 1 学期转换为该学年开始公历年的 Fall，第 2 学期转换为下一公历年的 Spring。不得把次年 2 月或暑假颁发日期当成教学学期。Awards 日期列为颁发月份，说明与相册另注明实际学期。
12. **图标**：使用经典繁方篆「唐」，字体白色、背景 `#4E7DC3`，无白色内框。页首 35px 用 `brand.svg` 原始字形；favicon 用已确认的 B 小尺寸版本，保留所有轮廓并调整至 16px 网格，同时提供 SVG 与 16×16 / 32×32 PNG。页面明确填写 sizes，修改时更新版本参数。不得放大低清截图作为正式图标；完整字体不进公开仓库，来源元数据和 SHA-256 见 `THIRD_PARTY_NOTICES.md`。
13. **响应式与可访问性**：电脑两列，手机单列，导航可展开；320px 起无横向溢出。600px 及以下的简介区先显示邮箱，再显示下一行的 Hsinchu, Taiwan；两行横跨简介宽度，图标与正文分别左对齐。手机菜单按钮只留三横线、46px 触控区域，必须有随展开状态更新的 aria-label。菜单布局下，上滑页面（scrollY 增大）隐藏页首、下拉（scrollY 减小）显示，260ms 缓动平移、12px 累积阈值；展开菜单时始终显示，关闭才恢复；键盘焦点须能唤回页首，减少动态效果时不动画，桌面页首始终可见。修改样式或脚本交互后更新模板中的资源版本参数。保留语义标题、可见键盘焦点、跳转链接、对话框标签，以及无 JavaScript 的基本阅读和图片链接。
14. **公开范围**：允许本次明确授权的奖状、奖杯、奖牌、照片和具体最终论文；不公开身份证件、成绩单、申请表、推荐信、录取通知、学生奖惩记录、未授权稿件或整个资料目录。用户已确认公开 CV 不含电话号码，保留学校邮箱，后接个人邮箱 mark.wqtang@gmail.com。
15. **引用复制**：BibTeX 控件始终位于每篇论文所有其他资源之后；字号、边框与内边距采用 DOI / PDF 的公共样式，图标间距 0.2rem，不设置造成额外留白的固定最小宽度。复制成功后仅在按钮内显示勾号与 Copied 2 秒，不弹提示框或新分页，标签预留两种状态的宽度，保持按钮尺寸。失败时提供选中代码的弹窗和手动复制；无 JS 使用原生展开文本。引用来自 `content/citations.json`，记录来源，按正式元数据保存作者、题名、刊会、年份与已核实的卷期/页码/DOI；不把共同一作星号、网页粗体或页面状态当作作者名。待刊用 To appear note，不补造字段；甲骨文论文用正式英文题名、作者和 In Chinese note。
16. **图片性能**：所有相册媒体必须有本地 WebP preview；首页活动照片复用这些预览。View Original 始终指向原 JPG / PDF，禁止把原图替换成有损预览。用 `scripts/optimize_images.py` 处理 manifest 已审核的公开图，不从私人档案批量读取；保留 `preview_source` 以便重复生成，更新 `content/image-previews.json` 与派生资产 SHA-256。新增照片后先生成预览，再 build。首页羽毛球原图只在用户点击后请求，其余奖项弹窗优先使用预览；不提前加载全部 87 张媒体。
17. **分享与导航**：导航顺序为 About / Research / Publications / Experience / Awards / Teaching / Hobbies；正文 Education & Experience 位于 Publications 之后、Awards & Honors 之前。首页和相册保留绝对 URL 的 og:image、图片宽高与 alt、Twitter summary_large_image。分享图固定 1200×630，只显示英文姓名，学校上方写系所，研究方向单行为 Electronic Design Automation · AI for EDA；文字与头像间距 84px，照片左侧起点 68px，左上 Homepage 32px，底部网址与地名 30px。当前浏览器与首页分享标题 Wuqian Tang | Homepage、摘要 CS Ph.D. Candidate at National Tsing Hua University.，不追加 Learning 或研究描述。头像、姓名、学校或研究方向改变后，从 `content/social-preview.html` 用 Chromium 按 1200×630、设备倍率 1 重渲染 PNG，等待图片和字体加载，保留 PNG，并以 JPEG RGB quality 95、4:4:4、optimized 导出分享版；更新新版本图片文件名、全部分享标签与 manifest，旧图片地址保留可访问。正式分享直接使用原网址，参数仅用于诊断缓存；各平台真实卡片效果不能由本站爬虫 UA 检查替代。ORCID 等身份链接须由正式个人记录及论文匹配核对，不能只凭同名猜测；与 Person sameAs 同步。

Hobbies 用词参考了 [Siyuan Jiang 的学术主页](https://siyuanj.github.io/) 中同名栏目；它直接表达爱好，适合当前内容。网站不需要附上这条用词参考。

## 文件与更新步骤

| 文件 | 用途 |
| --- | --- |
| `content/profile.json` | 论文、奖项、月份、官方链接、课程和经历数据 |
| `content/citations.json` | 21 篇 BibTeX 引用、来源与核对日期；需与论文数据同步维护 |
| `content/homepage.html` | 首页结构和 About Me / Hobbies 文案 |
| `content/award-gallery.html` | 相册模板 |
| `content/public-assets.json` | 明确审核的公开文件路径、来源和 SHA-256 |
| `content/image-previews.json` | 87 张 WebP 的大小、来源 SHA-256、尺寸与编码记录 |
| `content/social-preview.html` | 1200×630 社交分享图的可编辑设计源 |
| `site/assets/css/main.css` | 响应式布局、字体、颜色、照片展示裁切 |
| `site/assets/js/main.js` | 导航、首页/相册弹窗、预览方向与裁切、触控翻页、折叠条目与返回定位 |
| `scripts/build.py` | 生成页面并检查公开目录、DOI 和本地 PDF 链接规范 |
| `scripts/optimize_images.py` | 从已审核公开 JPEG / PDF 预览生成 WebP；需要 Pillow 的 WebP 编码支持 |
| `content/Wuqian_Tang_Public_CV.tex` | 公开 CV 可编辑源文件 |
| `preview/` | 设备预览、浏览器与可访问性验证结果，未部署到网站 |

更新流程：修改数据或模板 → 只复制审核过的公开文件并更新 manifest → 生成页面 → 检查 → 预览 → 只提交本网页仓库的变更 → 推送 master → 检查 GitHub Actions 与线上版本。

照片变更时，在 build 前额外运行 `python3 scripts/optimize_images.py`；日常构建及部署直接使用提交的 WebP，无需安装 Pillow。分享图只在其内容变化时重渲染，不能在每次构建里下载字体或访问私人资料。

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

本轮新增验证涵盖首页所有 86 份资源链接的预览（另单独检查内嵌羽毛球照片）、资源顺序、所有外部链接的新分页属性与实际打开行为、助教新闻学期筛选、Awards 时间范围固定换行、Education / Work Experience 单行日期与博士预计毕业时间、两种羽毛球裁切、手机横屏弹窗边界、键盘/触控翻页和无 JavaScript 相册回退。四种尺寸的补充检查核对头像双角线（右上 29px、左下 58px）、日期的电脑/平板右对齐与手机左对齐、篆体 SVG 图标、Materials / Announcements、Journal 链接末位、原生正向奖状与句末 [Medal]；390px 和 320px 另核对邮箱下一行的地点及左对齐。桌面与手机首页/相册及打开的桌面弹窗 WCAG 自动扫描均无报告项。33 个本地 HTML 页面的 556 处本地链接与图片引用、95 个外部锚点的新分页属性、公开文件清单及原始 SHA-256 均验证通过。

结果见 `preview/validation.json`、`preview/gallery-validation.json`、`preview/revision-validation.json`、`preview/followup-validation.json`、`preview/accessibility.json`、`preview/viewer-motion-validation.json`、`preview/layout-refinement-validation.json`；设备截图与裁切/奖状弹窗截图位于 `preview/`。上一版部署已匿名核对首页、样式、脚本、方篆 SVG、转正奖状及预览、31 个相册、5 份论文 PDF 和当时全部 116 份 manifest 资产；本轮新增 87 张 WebP 与分享图后，manifest 为 204 份资产。屏幕尺寸模拟与自动扫描不能替代真实设备或人工阅读。

最新布局补充验证覆盖 1440px、820px、390px、320px、600px 和 601px：五条教育/工作日期均为单行，600px 及以下左对齐，以上右对齐；右上角线宽高为左下角的一半，颜色和线宽一致；所有尺寸无横向溢出。已刷新电脑、平板、手机首页及 Education & Experience 截图，并人工查看手机日期与头像装饰。

本轮动效验收另覆盖电脑、平板、手机、320px 手机和手机横屏的动画帧、控件位置、连续翻页、双向滑动、键盘 Enter 激活、关闭重开、相册页、慢速加载和减少动态效果；电脑 / 手机打开的弹窗可访问性扫描通过。

BibTeX 验收结果见 `preview/bibtex-validation.json`，截图为 `preview/bibtex-*.png`。覆盖 1440×1000、820×1180、390×844、320×568 和 844×390：电脑逐篇读取实际剪贴板核对全部 21 篇，其他尺寸核对 TAPCO、甲骨文与待刊记录；全部按钮在原有链接最后、反馈后尺寸不变；复制拒绝和 API 不可用时回退正确，弹窗重试、手动选择、Escape、关闭与焦点返回正常；重新打开不会保留前一篇的 Copied；窄屏无横向溢出。无 JS 原生展开文本通过。电脑和手机首页及引用弹窗的 WCAG 自动扫描没有报告项。独立使用 BibTeX 0.99d / plain.bst 处理 21 条引用无错误；只有甲骨文期刊实际仅有期号、没有卷号，因此标准样式给出 number without volume 提示，不为消除提示伪造卷号。

图片与分享验收见 `preview/performance-sharing-validation.json`：覆盖 1440×1000、1024×768、1000×768、820×1180、390×844、320×568、844×390，无横向溢出；Teaching 导航定位及当前栏目高亮正常，另验证连续调整手机竖屏、横屏、桌面与 320px 时重新计算观察区域。首页三张活动照片只请求 WebP，除头像外不请求原 JPEG；桌面和手机羽毛球点击后才请求原图，其他奖项弹窗保持使用预览；View Original 指向原 JPEG / PDF。全部 31 个相册的 87 张 WebP 均实际解码成功，页面浏览不会请求原始文件。首页与相册的分享元数据、ORCID 和 sameAs、16/32px favicon 尺寸与原版页首图标均核对；电脑/手机首页可访问性扫描通过，并读取一次真实 BibTeX 剪贴板作回归检查。全部原有 116 份 manifest 文件的 SHA-256 保持不变，87 张 WebP 的实际格式、尺寸与无 EXIF 状态核对通过；分享 PNG 尺寸为 1200×630。

WebP 弹窗回归再次覆盖五种尺寸、实际动画帧、双向滑动、键盘、连续翻页、关闭重开、相册页、慢速加载和减少动态效果；桌面/手机弹窗可访问性扫描通过。电脑、平板、手机及 Hobbies 截图已刷新；分享图已人工查看姓名、学校、研究文字无截断。

分享图修订验收见 `preview/social-preview-validation.json`：仅显示英文名、系所在学校上方、研究方向在一行、文字与照片间距 84px、照片左侧起点 68px、Homepage 32px、底部网址与地名 30px，所有文字位于 1200×630 画布内，已人工查看。用户已确认 Android LINE 新测试地址能够显示修订前的 PNG，保留该事实与缓存推断。

最新按钮间距及分享标签验收见 `preview/bibtex-spacing-sharing-validation.json`：电脑与手机 DOI / PDF / BibTeX 的左右内边距均为 7.2px、字号 13px、圆角 4px，电脑高度 26px、手机高度 44px；BibTeX 图标间距 3.2px，按钮宽度约 74.77px，Copied 状态尺寸与实际剪贴板核对通过。首页和全部 31 个相册的版本化图片标签及 CSS / JS 地址检查通过。

手机导航验收见 `preview/mobile-header-validation.json`：覆盖 390×844、320×568、820×1180、844×390、999×768、1000×768、1440×1000。验证实际中间动画帧、上滑隐藏／下拉显示、微小滑动不闪动、正文无布局位移、展开菜单后连续双向滚动仍保持显示、关闭后恢复收放、键盘焦点显示与 Escape 关闭、顶部恢复显示、减少动态效果、相册页首、无 JS 导航回退；手机可访问性扫描通过，桌面保持导航可见。手机与平板截图、展开菜单截图已刷新。

部署结果可在 [GitHub Pages 工作流](https://github.com/wuqian-tang/wuqian-tang.github.io/actions/workflows/pages.yml) 查看；本记录随此次 master 提交发布。以后继续更新时，以最新成功工作流和线上实际文件为准。
