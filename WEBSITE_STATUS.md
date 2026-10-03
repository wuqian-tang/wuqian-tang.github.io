# 个人主页进度与维护规范

更新日期：2026-10-03。本文用于继续维护当前网站；以后开始更新前，先阅读本文，再检查实际仓库和线上内容。

- 网站：[wuqian-tang.github.io](https://wuqian-tang.github.io/)
- 公开仓库：[wuqian-tang/wuqian-tang.github.io](https://github.com/wuqian-tang/wuqian-tang.github.io)
- 发布分支：`master`；GitHub Actions 只发布 `site/`。
- 用户已授权上线、公开网页仓库和继续修改当前网站。原始个人资料仓库保持 private。

## 当前完成的内容

- 英文主页，姓名为 Wuqian Tang（唐梧遷）；保留原头像、LinkedIn、Google Scholar、公开版 CV。
- Recent News 只保留 2026 年，目前 4 条。
- 删除 About Me 最后的研究标签、甲骨文研究介绍句和 Technical Skills 栏目；甲骨文论文仍保留在 Publications 中。
- 主栏目与 Education、Research & Industry 等子标题统一为 Title Case，取消子标题的 CSS 全大写转换。
- 爱好栏目使用 Hobbies，标题与其他栏目一致；删除 Off the Clock / Personal Interests 引导文字。包含 badminton、swimming、table tennis。
- 羽毛球首页照片向下调整展示范围，减少上方窗帘，保留人物、奖牌与球拍；全尺寸原图仍可打开。
- 首页获奖展示照改为新竹市优秀青年照片第 2 张；保留行健奖照片。IWLS 完整照片仍在对应相册中。
- 王老师主页链接为 `http://nthucad.cs.nthu.edu.tw/~wcyao/`。
- 6 门助教课程均注明 Department of Computer Science、Department of Electrical Engineering 或 College of Semiconductor Research。
- Teaching 中的助教获奖括号写获奖对应的学期，而不是颁发月份：Excellent 为 Spring 2026；Outstanding 为 Spring 2025、Fall 2025、Spring 2026。已逐张查看奖杯及三张奖状上的学期。
- 31 个奖项相册，含 87 份原始奖状、照片、奖杯、奖牌及纪念牌文件，另有 24 张 PDF 奖状预览。所有原始文件按 SHA-256 校验，未重压缩。
- 所有奖项均补上月份；合并条目展示时间范围，正文保留各次获奖月份。
- 奖项标题字体、字号、字重、颜色一致；点击资源位于条目末尾。已加入 33 个对应的系所、学院、学校、政府或比赛公告链接。
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

ISPD 2026 通用比赛页的当前获奖名单与本人证书不一致，因此暂不作为获奖证明链接；使用本人证书和清华资工系公告。清华电资学院部分旧公告已跳转首页，已改用保留对应公告的清华官方校讯 PDF（1377 期第 9 页、1379 期第 13 页）。本次 33 个公告链接对应 31 个不同 URL，均已返回 HTTP 200；以后还需核对内容是否迁移，不能只检查状态码。

## 格式规范

1. **语言与姓名**：页面以英文为主，中文姓名只用繁体「唐梧遷」，置于姓名括号内。英文名统一 Wuqian Tang；引用作者名和正式机构名保持准确。
2. **标题**：栏目与子标题采用 Title Case，例如 About Me、Recent News、Awards & Honors、Education & Experience、Research & Industry、Hobbies。不得用 `text-transform: uppercase` 强制转换子标题。论文题名保持出版方原文，不为统一标题样式改写正式题名。
3. **视觉**：白色背景、深色正文、蓝色链接，系统字体，无远程字体依赖。奖项标题统一 `--ink`、`.9375rem`、550 字重，不按获奖等级改成蓝色。
4. **日期**：页面日期用英文三字母月份加年份，如 Sep 2026、May 2025；时间范围用 en dash（–），持续状态用 Present；多人次合并奖项在说明中列出实际月份。以证书、官方公告或经过核对的资料为依据。
5. **News**：当前只展示 2026 年，倒序排列，保持短句。不重复堆放全部奖项资源；必要时链接对应奖项或论文。
6. **奖项**：标题保持普通深色文字，在条目末尾使用 `[Photo]` / `[Photos]`、`[Certificate]` / `[Certificates]`、`[Trophy]`、`[Plaque]`、`[Medal]`。同类多张文件放入同一相册，不堆 photo1 / photo2。新闻用 `[News]`，系所用 `[Dept.]`，学院用 `[College]`，学校用 `[University]`，官方获奖结果用 `[Official]`。单纯比赛介绍用 `[Contest]` 或 `[Program]`；多个题目可以用 `[Dept. A]` 等短标签。
7. **外部来源**：对应具体奖项与年份，确认本人姓名或队伍。优先官方结果、系所、学院、学校和政府；不把通用首页、其他团队的成绩或旧年份名单当获奖公告。
8. **论文**：编号 J1 / J2 / C1–C19 保持稳定，作者顺序完整，本人加粗，星号表示 equal contribution。Invited paper、In Chinese 与 To appear 分别按事实使用。除 To appear 外，每篇必须有一个经过核对的 DOI。查不到 DOI 时按用户要求标为 To appear；不得使用相似题目的 DOI。
9. **论文 PDF**：优先正式官方全文或作者提供的可公开最终稿；下载后核对内容，存放 `site/files/papers/`。按钮链接用 `files/papers/文件名.pdf`，不得链接其他人的个人网页、远程 PDF 或临时下载 token。保留 PDF 原始字节，在 manifest 记录来源与 SHA-256。
10. **照片**：沿用真实照片，不生成或修改人物。首页活动照片可通过 CSS 控制展示裁切，原图可单独打开。图片需有准确的英文 alt；页面内惰性加载，奖状 PDF 提供预览和原始 PDF 链接。多张相册支持左右键、上一张/下一张和 Escape。
11. **Teaching**：每门课程包含正式英文课程名、所属系所或学院、教师和学期。不同学院课程不能统一写成 CS。助教奖项括号采用 `Spring 2025` / `Fall 2025` 格式，表示教学对应学期；证书学年度第 1 学期转换为该学年开始公历年的 Fall，第 2 学期转换为下一公历年的 Spring。不得把次年 2 月或暑假颁发日期当成教学学期。Awards 日期列为颁发月份，说明与相册另注明实际学期。
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
| `site/assets/js/main.js` | 导航、相册、折叠条目与返回定位 |
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

主页验证覆盖 1440×1000、1024×768、820×1180、768×1024、390×844、320×568、844×390；包含菜单、展开论文、图片弹窗、200% 字体和禁用 JavaScript。新增相册验证覆盖电脑、平板、手机和 320px 手机，包括 PDF 预览、左右键翻页、关闭、返回折叠奖项定位和无 JavaScript 原图访问。桌面与手机的首页和相册 WCAG 自动扫描均无报告项。

结果见 `preview/validation.json`、`preview/gallery-validation.json`、`preview/accessibility.json`。33 个本地 HTML 页面的 614 处本地链接与图片引用、公开文件清单和 5 份论文 PDF 已验证通过。部署后用匿名访问核对首页、样式、脚本、相册和论文 PDF。屏幕尺寸模拟与自动扫描不能替代真实设备或人工阅读。

部署结果可在 [GitHub Pages 工作流](https://github.com/wuqian-tang/wuqian-tang.github.io/actions/workflows/pages.yml) 查看；本记录随此次 master 提交发布。以后继续更新时，以最新成功工作流和线上实际文件为准。
