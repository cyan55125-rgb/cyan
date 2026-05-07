import type { GrammarPoint } from '../../types/grammar';

export const grammarData: GrammarPoint[] = [
  {
    id: 'en-gp-001',
    title: 'Present Simple Tense (一般现在时)',
    explanation: '一般现在时用于描述习惯性动作、普遍真理、固定安排或客观事实。主语为第三人称单数时，动词需加 -s 或 -es。',
    pattern: 'Subject + Verb(s/es) + Object / Subject + do/does + not + Verb + Object / Do/Does + Subject + Verb + Object?',
    examples: [
      { sentence: 'She **works** at a hospital every day.', translation: '她每天都在医院工作。', highlight: 'works' },
      { sentence: '**Do** you **like** coffee?', translation: '你喜欢咖啡吗？', highlight: 'Do...like' },
      { sentence: 'The sun **rises** in the east.', translation: '太阳从东方升起。', highlight: 'rises' }
    ],
    exercises: [
      { id: 'en-ex-001-1', type: 'fill-blank', question: 'He _____ (go) to school by bus every morning.', answer: 'goes', explanation: '主语 He 是第三人称单数，动词 go 需加 -es 变为 goes。' },
      { id: 'en-ex-001-2', type: 'multiple-choice', question: 'Choose the correct sentence:', options: ['She don\'t like apples.', 'She doesn\'t likes apples.', 'She doesn\'t like apples.', 'She not like apples.'], answer: 'She doesn\'t like apples.', explanation: '第三人称单数否定形式用 doesn\'t + 动词原形。' },
      { id: 'en-ex-001-3', type: 'fill-blank', question: 'They _____ (not/watch) TV on weekdays.', answer: "don't watch", explanation: '主语 They 是复数，否定形式用 don\'t + 动词原形。' },
      { id: 'en-ex-001-4', type: 'ordering', question: 'Rearrange: (always / time / on / she / up / wakes / )', answer: ['She', 'always', 'wakes', 'up', 'on', 'time'], explanation: '频度副词 always 放在主语和动词之间。' }
    ],
    language: 'en',
    difficulty: 'beginner'
  },
  {
    id: 'en-gp-002',
    title: 'Past Simple Tense (一般过去时)',
    explanation: '一般过去时用于描述过去某个特定时间发生的动作或状态。规则动词加 -ed，不规则动词需特殊记忆（如 went, ate, saw）。',
    pattern: 'Subject + Verb(ed/irregular) + Object / Subject + did not + Verb + Object / Did + Subject + Verb + Object?',
    examples: [
      { sentence: 'I **visited** Paris last summer.', translation: '去年夏天我去了巴黎。', highlight: 'visited' },
      { sentence: '**Did** you **finish** your homework?', translation: '你完成作业了吗？', highlight: 'Did...finish' },
      { sentence: 'They **went** to the cinema yesterday.', translation: '他们昨天去看电影了。', highlight: 'went' }
    ],
    exercises: [
      { id: 'en-ex-002-1', type: 'fill-blank', question: 'We _____ (see) a great movie last night.', answer: 'saw', explanation: 'see 的过去式是不规则变化 saw。' },
      { id: 'en-ex-002-2', type: 'multiple-choice', question: 'Choose the correct form:', options: ['She didn\'t went to the party.', 'She didn\'t go to the party.', 'She doesn\'t went to the party.', 'She don\'t go to the party.'], answer: 'She didn\'t go to the party.', explanation: '过去时否定用 didn\'t + 动词原形。' },
      { id: 'en-ex-002-3', type: 'ordering', question: 'Rearrange: (yesterday / buy / a / I / car / new / )', answer: ['I', 'bought', 'a', 'new', 'car', 'yesterday'], explanation: 'buy 的过去式是 bought，时间状语 yesterday 放句末。' },
      { id: 'en-ex-002-4', type: 'fill-blank', question: '_____ you _____ (read) that book before?', answer: ['Did', 'read'], explanation: '一般过去时疑问句用 Did + 主语 + 动词原形。' }
    ],
    language: 'en',
    difficulty: 'beginner'
  },
  {
    id: 'en-gp-003',
    title: 'Present Perfect Tense (现在完成时)',
    explanation: '现在完成时表示过去发生的动作对现在造成的影响或结果，或从过去持续到现在的动作/状态。常与 already, yet, ever, never, since, for 连用。',
    pattern: 'Subject + have/has + past participle(V-ed/pp) + Object',
    examples: [
      { sentence: 'I **have lived** here **since** 2010.', translation: '我从2010年起就住在这里。', highlight: 'have lived...since' },
      { sentence: 'She **has already finished** her report.', translation: '她已经完成了报告。', highlight: 'has already finished' },
      { sentence: '**Have** you **ever been** to Japan?', translation: '你去过日本吗？', highlight: 'Have...ever been' }
    ],
    exercises: [
      { id: 'en-ex-003-1', type: 'fill-blank', question: 'They _____ (know) each other for ten years.', answer: 'have known', explanation: 'for ten years 表示持续时间段，用现在完成时 have known。' },
      { id: 'en-ex-003-2', type: 'multiple-choice', question: 'Choose the correct sentence:', options: ['I have saw this movie before.', I have seen this movie before.', 'I did see this movie before.', 'I has seen this movie before.'], answer: 'I have seen this movie before.', explanation: 'I 用 have，see 的过去分词是 seen。' },
      { id: 'en-ex-003-3', type: 'fill-blank', question: 'He _____ (not/complete) the project yet.', answer: "hasn't completed", explanation: 'yet 常用于现在完成时否定句，He 是第三人称单数用 hasn\'t。' },
      { id: 'en-ex-003-4', type: 'ordering', question: 'Rearrange: (never / sushi / have / tried / I / )', answer: ['I', 'have', 'never', 'tried', 'sushi'], explanation: 'never 是频度副词，放在 have 和过去分词之间。' }
    ],
    language: 'en',
    difficulty: 'intermediate'
  },
  {
    id: 'en-gp-004',
    title: 'Articles (冠词：a/an/the)',
    explanation: '不定冠词 a/an 用于首次提到的可数名词单数（an 用于元音音素前）；定冠词 the 用于特指、再次提及或独一无二的事物；零冠词用于泛指复数/不可数名词、专有名词等。',
    pattern: 'a + consonant sound / an + vowel sound / the + specific noun / no article + general plural/uncountable',
    examples: [
      { sentence: 'I saw **a** dog in **the** park.', translation: '我在公园里看到一只狗。', highlight: 'a...the' },
      { sentence: 'She is **an** honest person.', translation: '她是一个诚实的人。', highlight: 'an' },
      { sentence: '_____ Cats are cute animals.', translation: '猫是可爱的动物。', highlight: '(零冠词)' }
    ],
    exercises: [
      { id: 'en-ex-004-1', type: 'fill-blank', question: 'My brother is _____ university student. He studies at _____ best university in _____ Europe.', answer: ['a', 'the', 'Ø'], explanation: 'university 以辅音音素开头用 a；best 为最高级特指用 the；洲名前不加冠词。' },
      { id: 'en-ex-004-2', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['I ate an apple and a orange.', 'I ate a apple and an orange.', 'I ate an apple and an orange.', 'I ate apple and orange.'], answer: 'I ate an apple and an orange.', explanation: 'apple 元音开头用 an，orange 元音开头也用 an。' },
      { id: 'en-ex-004-3', type: 'fill-blank', question: '_____ moon orbits around _____ Earth.', answer: ['The', 'the'], explanation: 'moon 和 Earth 都是独一无二的天然天体，前加 the。' },
      { id: 'en-ex-004-4', type: 'ordering', question: 'Rearrange: (wants / become / engineer / an / She / to / )', answer: ['She', 'wants', 'to', 'become', 'an', 'engineer'], explanation: 'engineer 以元音音素开头，用不定冠词 an。' }
    ],
    language: 'en',
    difficulty: 'beginner'
  },
  {
    id: 'en-gp-005',
    title: 'Conditionals Type 1 & 2 (条件句第一类与第二类)',
    explanation: '第一类条件句（真实条件）：If + present, will + verb（将来可能发生）；第二类条件句（虚拟条件）：If + past simple, would + verb（与现在事实相反的假设）。',
    pattern: 'Type1: If + S + V(present), S + will + V / Type2: If + S + V(past), S + would + V',
    examples: [
      { sentence: 'If it **rains** tomorrow, we **will cancel** the picnic.', translation: '如果明天下雨，我们就取消野餐。', highlight: 'rains...will cancel' },
      { sentence: 'If I **were** you, I **would accept** the offer.', translation: '如果我是你，我会接受这个提议。', highlight: 'were...would accept' },
      { sentence: 'If she **had** more time, she **would learn** piano.', translation: '如果她有更多时间，她会学钢琴。', highlight: 'had...would learn' }
    ],
    exercises: [
      { id: 'en-ex-005-1', type: 'fill-blank', question: 'If you _____ (study) harder, you _____ (pass) the exam.', answer: ['study', 'will pass'], explanation: '真实条件句：从句用一般现在时，主句用 will + 动词原形。' },
      { id: 'en-ex-005-2', type: 'multiple-choice', question: 'Choose the correct conditional sentence:', options: ['If I am rich, I will travel the world.', 'If I were rich, I would travel the world.', 'If I was rich, I will travel the world.', 'If I were rich, I will travel the world.'], answer: 'If I were rich, I would travel the world.', explanation: '虚拟语气第二类：从句用过去式(were)，主句用 would + 动词原形。' },
      { id: 'en-ex-005-3', type: 'fill-blank', question: 'If he _____ (not/miss) the bus, he _____ (be) on time.', answer: ["didn't miss", "would be"], explanation: '与过去事实相反的假设，从句用过去式，主句用 would be。' },
      { id: 'en-ex-005-4', type: 'ordering', question: 'Rearrange: (would / call / me / If / you / needed / help / , / )', answer: ['If', 'you', 'needed', 'help', ',', 'I', 'would', 'call', 'you'], explanation: '第二类条件句结构：If + 过去式, would + 动词原形。' }
    ],
    language: 'en',
    difficulty: 'intermediate'
  },
  {
    id: 'en-gp-006',
    title: 'Passive Voice (被动语态)',
    explanation: '被动语态强调动作承受者而非执行者。构成：be + 过去分词。不同时态通过 be 动词的变化体现（is/am/are done, was/were done, has/have been done, will be done）。',
    pattern: 'Subject(receiver) + be + past participle (+ by + agent)',
    examples: [
      { sentence: 'This bridge **was built** in 1990.', translation: '这座桥建于1990年。', highlight: 'was built' },
      { sentence: 'English **is spoken** in many countries.', translation: '许多国家都说英语。', highlight: 'is spoken' },
      { sentence: 'The report **will be completed** by Friday.', translation: '报告将在周五之前完成。', highlight: 'will be completed' }
    ],
    exercises: [
      { id: 'en-ex-006-1', type: 'fill-blank', question: 'The letter _____ (write) by Mary yesterday.', answer: 'was written', explanation: 'yesterday 表明用一般过去时的被动语态 was written。' },
      { id: 'en-ex-006-2', type: 'multiple-choice', question: 'Change to passive voice: "Someone stole my wallet."', options: ['My wallet is stolen.', 'My wallet was stolen.', 'My wallet has been stolen.', 'My wallet stole.'], answer: 'My wallet was stolen.', explanation: '主动语态的一般过去时变被动为 was/were + 过去分词。' },
      { id: 'en-ex-006-3', type: 'fill-blank', question: 'A new hospital _____ (build) in our city next year.', answer: 'will be built', explanation: 'next year 表示将来，用将来时的被动语态 will be built。' },
      { id: 'en-ex-006-4', type: 'ordering', question: 'Rearrange to passive: (is / The / cleaned / room / every day / )', answer: ['The', 'room', 'is', 'cleaned', 'every', 'day'], explanation: '一般现在时被动语态：主语 + is/am/are + 过去分词。' }
    ],
    language: 'en',
    difficulty: 'intermediate'
  },
  {
    id: 'en-gp-007',
    title: 'Relative Clauses (关系从句)',
    explanation: '关系从句用来修饰名词（先行词）。who/that 指人，which/that 指物，where 指地点，when 指时间，whose 表示所属关系。限制性从句无逗号，非限制性从句有逗号。',
    pattern: 'Antecedent + who/which/that/where/when/whose + clause',
    examples: [
      { sentence: 'The man **who lives** next door is a doctor.', translation: '住在隔壁的那个男人是一名医生。', highlight: 'who lives' },
      { sentence: 'This is the book **which** I recommended **to you**.', translation: '这就是我推荐给你的那本书。', highlight: 'which' },
      { sentence: 'I still remember the day **when** we first met.', translation: '我仍然记得我们初次见面的那一天。', highlight: 'when' }
    ],
    exercises: [
      { id: 'en-ex-007-1', type: 'fill-blank', question: 'The girl _____ father is a teacher won the competition.', answer: 'whose', explanation: '表示"……的父亲的"，用 whose 表示所属关系。' },
      { id: 'en-ex-007-2', type: 'multiple-choice', question: 'Choose the correct relative pronoun:', options: ['This is the museum where we visited last year.', 'This is the museum which we visited last year.', 'This is the museum what we visited last year.', 'This is the museum that we visited there last year.'], answer: 'This is the museum which we visited last year.', explanation: 'museum 是物作宾语，可用 which 或 that 引导。' },
      { id: 'en-ex-007-3', type: 'fill-blank', question: 'The hotel _____ we stayed was very comfortable.', answer: ['where', 'which', 'that'], explanation: '先行词 hotel 表地点，可用 where 或 which/that 作 stay 的宾语。' },
      { id: 'en-ex-007-4', type: 'ordering', question: 'Rearrange: (is / the / My / brother / works / company / where / )', answer: ['The', 'company', 'where', 'my', 'brother', 'works', 'is...', ''], explanation: 'where 引导的关系从句修饰 company，表示"我哥哥工作的公司"。' }
    ],
    language: 'en',
    difficulty: 'upper-intermediate'
  },
  {
    id: 'en-gp-008',
    title: 'Reported Speech (间接引语)',
    explanation: '间接引语转述他人话语时，人称、时态、时间和地点状语需相应变化。一般现在时→一般过去时，一般过去时→过去完成时，will→would，can→could 等。',
    pattern: 'Reporting verb + (that) + [changed tense/pronoun/time/place]',
    examples: [
      { sentence: 'He said, "I **am** tired." → He said (that) he **was** tired.', translation: '他说："我累了。" → 他说他累了。', highlight: 'am → was' },
      { sentence: 'She asked me **if** I **liked** coffee.', translation: '她问我是否喜欢咖啡。', highlight: 'if...liked' },
      { sentence: 'They told us they **would come** the next day.', translation: '他们告诉我们第二天会来。', highlight: 'would come...next day' }
    ],
    exercises: [
      { id: 'en-ex-008-1', type: 'fill-blank', question: '"I will call you tomorrow," she said. → She said that she _____ call me _____ .', answer: ['would', 'the next/following day'], explanation: '直接引语中的 will 变为 would，tomorrow 变为 the next day 或 the following day。' },
      { id: 'en-ex-008-2', type: 'multiple-choice', question: 'Change to reported speech: "Are you busy?" he asked me.', options: ['He asked me if I was busy.', 'He asked me if I am busy.', 'He asked me was I busy.', 'He asked me that I was busy.'], answer: 'He asked me if I was busy.', explanation: '一般疑问句转间接引语用 if/whether 引导，时态后退一步。' },
      { id: 'en-ex-008-3', type: 'fill-blank', question: '"Don\'t make noise!" the teacher told us. → The teacher told us _____ make noise.', answer: 'not to', explanation: '祈使句的否定转间接引语用 tell sb. not to do 结构。' },
      { id: 'en-ex-008-4', type: 'ordering', question: 'Rearrange: (said / had / that / finished / dinner / she / )', answer: ['She', 'said', 'that', 'she', 'had', 'finished', 'dinner'], explanation: '直接引语"I finished dinner"变为间接引语时，过去式变为过去完成时 had finished。' }
    ],
    language: 'en',
    difficulty: 'upper-intermediate'
  },
  {
    id: 'en-gp-009',
    title: 'Gerund vs. Infinitive (动名词与不定式)',
    explanation: '某些动词后只能接动名词(-ing)：enjoy, avoid, suggest, finish, mind, practice 等；某些动词后只能接不定式(to do)：decide, hope, promise, agree, plan 等；部分动词两者皆可但含义略有不同。',
    pattern: 'verb + gerund(V-ing) / verb + infinitive(to V) / verb + object + infinitive(to V)',
    examples: [
      { sentence: 'I enjoy **reading** books in my free time.', translation: '我喜欢在空闲时间读书。', highlight: 'reading' },
      { sentence: 'She decided **to study** abroad next year.', translation: '她决定明年出国留学。', highlight: 'to study' },
      { sentence: 'He stopped **smoking** last month. (quit)', translation: '他上个月戒烟了。', highlight: 'stopped smoking' }
    ],
    exercises: [
      { id: 'en-ex-009-1', type: 'fill-blank', question: 'She suggested _____ (go) to the beach this weekend.', answer: 'going', explanation: 'suggest 后接动名词 going，不接不定式。' },
      { id: 'en-ex-009-2', type: 'multiple-choice', question: 'Choose the correct form:', options: ['I remember to lock the door.', 'I remember locking the door.', 'Both are correct with same meaning.', 'Neither is correct.'], answer: 'I remember locking the door.', explanation: 'remember doing = 记得做过某事；remember to do = 记得要去做某事（未做）。此处语境为回忆。' },
      { id: 'en-ex-009-3', type: 'fill-blank', question: 'They promised _____ (help) us with the project.', answer: 'to help', explanation: 'promise 后接不定式 to help。' },
      { id: 'en-ex-009-4', type: 'ordering', question: 'Rearrange: (avoid / should / You / eating / late / at / night / )', answer: ['You', 'should', 'avoid', 'eating', 'late', 'at', 'night'], explanation: 'avoid 后必须接动名词 eating。should + 动词原形构成情态动词短语。' }
    ],
    language: 'en',
    difficulty: 'intermediate'
  },
  {
    id: 'ja-gp-001',
    title: 'は vs. が (主题标记 vs. 主格标记)',
    explanation: '「は」提示主题，表示"关于……的话"；「が」标记主语，强调主语本身或用于从句中。疑问词作主语时必须用「が」。',
    pattern: 'A は B だ/です / A が B を/に V',
    examples: [
      { sentence: '私**は**学生です。', translation: '我是学生。（主题是我）', highlight: 'は' },
      { sentence: '誰**が**来ましたか？', translation: '谁来了？（疑问词作主语用が）', highlight: 'が' },
      { sentence: '雨**が**降っています。', translation: '正在下雨。（现象描写用が）', highlight: 'が' }
    ],
    exercises: [
      { id: 'ja-ex-001-1', type: 'fill-blank', question: '私_____日本人です。彼_____中国人ではありません。', answer: ['は', 'は'], explanation: '两句都是提示主题，用は。' },
      { id: 'ja-ex-001-2', type: 'multiple-choice', question: 'Which particle is correct? 犬_____走っています。', options: ['は', 'が', 'を', 'に'], answer: 'が', explanation: '现象描写句（正在跑的狗）用が标记主语。' },
      { id: 'ja-ex-001-3', type: 'fill-blank', question: 'このケーキ_____美味しいです。', answer: 'は', explanation: '评价某事物时，用は提示主题。' },
      { id: 'ja-ex-001-4', type: 'ordering', question: 'Rearrange: (が / 誰 / しました / この / 作った / ？/ 料理 / )', answer: ['誰', 'が', 'この', '料理', 'を', '作りました', 'か'], explanation: '疑问词「誰」作主语时必须用が。' }
    ],
    language: 'ja',
    difficulty: 'beginner'
  },
  {
    id: 'ja-gp-002',
    title: 'て形 (Te-form) 的用法',
    explanation: 'て形是日语中最常用的活用形之一，可用于：①连接两个动作（先后顺序）；②请求（～てください）；③进行状态（～ている）；④许可/禁止（～てもいい／～てはいけない）。',
    pattern: 'V-te + ください / V-te + いる / V-te + もいい / V-te + はいけない',
    examples: [
      { sentence: '朝ご飯を**食べて**、学校へ行きます。', translation: '吃完早饭后去学校。（动作先后）', highlight: '食べて' },
      { sentence: '窓を**開けて**ください。', translation: '请打开窗户。（请求）', highlight: '開けて' },
      { sentence: '彼は今本を**読んで**います。', translation: '他正在看书。（进行状态）', highlight: '読んで' }
    ],
    exercises: [
      { id: 'ja-ex-002-1', type: 'fill-blank', question: '宿題を_____（する→て形）、テレビを見てもいいですか。', answer: 'して', explanation: 'する的て形是して。' },
      { id: 'ja-ex-002-2', type: 'multiple-choice', question: 'Choose the correct te-form of 読む(yomu):', options: ['よみて', 'よんで', 'よって', 'よいて'], answer: 'よんで', explanation: '読む是五段动词（ま行），て形为よんで（促音便）。' },
      { id: 'ja-ex-002-3', type: 'fill-blank', question: 'ここで写真を撮って_____（て形+はいけない）はいけません。', answer: 'は', explanation: '禁止形式：て形 + は + いけない。' },
      { id: 'ja-ex-002-4', type: 'ordering', question: 'Rearrange: (に / 行って / 、 / 買物 / 映画 / を / 見て / )', answer: ['映画', 'を', '見て', '、', '買い物', 'に', '行って'], explanation: '先看电影，然后去购物——て形连接两个动作。' }
    ],
    language: 'ja',
    difficulty: 'beginner'
  },
  {
    id: 'ja-gp-003',
    title: '可能形 (Potential Form)',
    explanation: '可能形表示能力或许可。五段动词：词尾う段→え段＋る（書く→書ける）；一段动词：去掉る＋られる（食べる→食べれる）；不规则动词：する→できる、来る→こられる。',
    pattern: 'V-potential + ことができる / V-potential directly',
    examples: [
      { sentence: '私は日本語**が話せます**。', translation: '我会说日语。', highlight: '話せます' },
      { sentence: 'この荷物は一人で**持てません**。', translation: '这个行李一个人拿不动。', highlight: '持てません' },
      { sentence: '明日は**来られます**か？', translation: '明天能来吗？', highlight: '来られます' }
    ],
    exercises: [
      { id: 'ja-ex-003-1', type: 'fill-blank', question: '彼はピアノを_____（弾く→可能形）ます。', answer: 'ひけ', explanation: '弾く是五段动词（か行），可能形为ひける。' },
      { id: 'ja-ex-003-2', type: 'multiple-choice', question: 'What is the potential form of 見る(miru)?', options: ['みられる', 'みれる', '見える', 'Both A and B'], answer: 'Both A and B', explanation: '見る的可能形可以是みられる（标准）或みれる（口语化）。' },
      { id: 'ja-ex-003-3', type: 'fill-blank', question: 'ここから富士山_____（見える→可能形）ます。', answer: '見え', explanation: '見える本身就是可能动词，其可能形仍为見える（或用見られる）。' },
      { id: 'ja-ex-003-4', type: 'ordering', question: 'Rearrange: (日本 / に / 行く / こと / が / できます / か / )', answer: ['日本', 'に', '行く', 'ことが', 'できます', 'か'], explanation: '行くことができます = 能去日本（另一种表达可能的方式）。' }
    ],
    language: 'ja',
    difficulty: 'intermediate'
  },
  {
    id: 'ja-gp-004',
    title: '受身形 (Passive Voice - 受身形)',
    explanation: '受身形表示被动动作。五段动词：词尾う段→あ段＋れる（書く→書かれる）；一段动词：去掉る＋られる（食べる→食べられる）；不规则：する→される、来る→こられる。',
    pattern: 'A は B に/から V-passive + れる/られる',
    examples: [
      { sentence: '私は先生**に褒められました**。', translation: '我被老师表扬了。', highlight: '褒められました' },
      { sentence: 'その建物は大正時代**に建てられました**。', translation: '那座建筑是大正时代建造的。', highlight: '建てられました' },
      { sentence: '弟は犬**に噛まれました**。', translation: '弟弟被狗咬了。', highlight: '噛まれました' }
    ],
    exercises: [
      { id: 'ja-ex-004-1', type: 'fill-blank', question: 'この小説は夏目漱石_____（書く→受身形）ました。', answer: 'によって書かれ', explanation: '作品被作者创作用「によって」，書く的受身形是書かれる。' },
      { id: 'ja-ex-004-2', type: 'multiple-choice', question: 'Change to passive: 母は私を叱った。', options: ['私は母に叱られた。', '私は母が叱られた。', '私は母を叱られた。', '私は母で叱られた。'], answer: '私は母に叱られた。', explanation: '动作执行者用に标记，叱る的受身形是叱られる。' },
      { id: 'ja-ex-004-3', type: 'fill-blank', question: '東京で国際会議_____（開く→受身形）れています。', answer: '開か', explanation: '開く（か行五段）的受身形是開かれる。' },
      { id: 'ja-ex-004-4', type: 'ordering', question: 'Rearrange: (に / 迷惑 / を / 彼 / かけられた / 兄 / )', answer: ['兄', 'は', '彼', 'に', '迷惑', 'を', 'かけられた'], explanation: '迷惑をかける的受身形：兄は彼に迷惑をかけられた（哥哥被他添麻烦了）。' }
    ],
    language: 'ja',
    difficulty: 'intermediate'
  },
  {
    id: 'ja-gp-005',
    title: '使役形 (Causative Form)',
    explanation: '使役形表示"让/使/令"某人做某事。五段动词：词尾う段→あ段＋せる（書く→書かせる）；一段动词：去掉る＋させる（食べる→食べさせる）；不规则：する→させる、来る→こさせる。',
    pattern: 'A は B に/を V-causative + せる/させる',
    examples: [
      { sentence: '母は妹**に部屋を掃除させた**。', translation: '妈妈让妹妹打扫了房间。', highlight: '掃除させた' },
      { sentence: '先生は学生**に作文を書かせた**。', translation: '老师让学生写了作文。', highlight: '書かせた' },
      { sentence: '父は私**にピアノを習わせた**。', translation: '爸爸让我学了钢琴。', highlight: '習わせた' }
    ],
    exercises: [
      { id: 'ja-ex-005-1', type: 'fill-blank', question: '医者は患者_____（休む→使役形）させた。', answer: 'に休ま', explanation: '休む（ま行五段）的使役形是休ませる，用に标记被使役对象。' },
      { id: 'ja-ex-005-2', type: 'multiple-choice', question: 'What is the causative form of 食べる(taberu)?', options: ['食べせる', '食べさせる', '食べらせる', '食べれさせる'], answer: '食べさせる', explanation: '一段动词去掉る加させる。' },
      { id: 'ja-ex-005-3', type: 'fill-blank', question: '監督は選手_____（走る→使役形）せた。', answer: 'に走ら', explanation: '走る（ら行五段）的使役形是走らせる。' },
      { id: 'ja-ex-005-4', type: 'ordering', question: 'Rearrange: (を / 子供 / 買いたい / に / おもちゃ / / 親 / させた / )', answer: ['親', 'は', '子供', 'に', 'おもちゃ', 'を', '買わせた'], explanation: '親は子供におもちゃを買わせた = 家长让孩子买了玩具。' }
    ],
    language: 'ja',
    difficulty: 'advanced'
  },
  {
    id: 'ja-gp-006',
    title: '～たい / ～たがる (愿望表达)',
    explanation: '～たい表示说话人自己的愿望（我想…）；～たがる表示第三人称的愿望流露（他想要…）。接续方式：去掉动词词尾ます＋たい／たがる。',
    pattern: 'V-masu-stem + たい / V-masu-stem + たがる',
    examples: [
      { sentence: '私は水**が飲みたい**です。', translation: '我想喝水。', highlight: '飲みたい' },
      { sentence: '弟**は**お菓子**を食べたがっている**。', translation: '弟弟想吃点心。', highlight: '食べたがっている' },
      { sentence: 'どこ**にも行きたくない**んです。', translation: '我哪里都不想去。', highlight: '行きたくない' }
    ],
    exercises: [
      { id: 'ja-ex-006-1', type: 'fill-blank', question: '彼女は京都_____（行く→たい形）と言っています。', answer: 'に行きたい', explanation: '第三人称的愿望引用，可以用～たいと言っている。' },
      { id: 'ja-ex-006-2', type: 'multiple-choice', question: 'Which is correct?', options: ['彼は水が飲みたいです。', '彼は水を飲みたいです。', '彼は水が飲みたがっています。', 'Both B and C are acceptable.'], answer: 'Both B and C are acceptable.', explanation: '第三人称愿望通常用～たがっている，但在引用或特定语境下也可以用～たい。' },
      { id: 'ja-ex-006-3', type: 'fill-blank', question: 'もう何_____（食べる→たい形の否定）ありません。', answer: 'も食べたく', explanation: '食べる的ます形是食べます，去掉ます加たくない。' },
      { id: 'ja-ex-006-4', type: 'ordering', question: 'Rearrange: (に / 会い / 彼 / 彼女 / たがって / います / と / )', answer: ['彼', 'は', '彼女', 'に', '会いたがっています'], explanation: '彼は彼女に会いたがっている = 他想见她（第三人称愿望）。' }
    ],
    language: 'ja',
    difficulty: 'beginner'
  },
  {
    id: 'ja-gp-007',
    title: '推量・様態・伝聞 (～ようだ/～そうだ/～らしい)',
    explanation: '～ようだ：基于视觉观察的推断（看起来像…）；～そうだ：基于外观样态（看起来快要…）或传闻（听说…）；～らしい：基于 hearsay 的推测（据说…）。',
    pattern: 'V辞書形/普通体 + らしい / Vます形 + そうだ(様態) / V普通形 + そうだ(伝聞)',
    examples: [
      { sentence: '雨が**降りそうです**。', translation: '看起来要下雨了。（样态）', highlight: '降りそうです' },
      { sentence: '天気予報によると、明日は雨**だそうです**。', translation: '据天气预报说明天有雨。（传闻）', highlight: 'だそうです' },
      { sentence: '彼はどうやら知らない**らしい**。', translation: '他似乎不知道。（推测）', highlight: 'らしい' }
    ],
    exercises: [
      { id: 'ja-ex-007-1', type: 'fill-blank', question: 'このケーキはとても美味し_____（そうだ・様態）です。', answer: 'そう', explanation: 'い形容词去掉い加そうだ表示样态判断。' },
      { id: 'ja-ex-007-2', type: 'multiple-choice', question: 'Choose the right expression:', options: ['彼は病気のようだ。(saw him coughing)', '彼は病気らしい。(heard from friend)', '彼は病気そうだ。(looks pale)', 'All can work depending on context.'], answer: 'All can work depending on context.', explanation: '三种形式都可用于推测，区别在于信息来源和确定性程度。' },
      { id: 'ja-ex-007-3', type: 'fill-blank', question: 'ニュースによると、地震_____（だそうです）ました。', answer: 'だったそう', explanation: '名词/な形容词后接传闻そうだ用だそうだ，过去式だったそうだ。' },
      { id: 'ja-ex-007-4', type: 'ordering', question: 'Rearrange: (彼女 / は / 泣き / そうです / )', answer: ['彼女', 'は', '泣きそうです'], explanation: '泣く的ます形是泣きます，去掉ます加そうだ→泣きそう（看起来要哭了）。' }
    ],
    language: 'ja',
    difficulty: 'intermediate'
  },
  {
    id: 'ja-gp-008',
    title: '敬語：尊敬語・謙譲語・丁寧語',
    explanation: '敬语体系分为三类：尊敬语（抬高对方动作：お～になる、～れる/られる）；谦逊语（压低自己动作：お～する、～ていただく）；丁寧语（礼貌体：です/ます）。',
    pattern: '尊敬語：おVになる / 謙譲語：おVする / 丁寧語：です・ます',
    examples: [
      { sentence: '社長はもう**お帰りになりました**。', translation: '社长已经回去了。（尊敬语）', highlight: 'お帰りになりました' },
      { sentence: '私が**ご案内いたします**。', translation: '我来为您带路。（谦逊语）', highlight: 'ご案内いたします' },
      { sentence: '何か**お手伝いしましょう**か。', translation: '需要帮忙吗？（丁寧语+谦逊语混合）', highlight: 'お手伝いしましょう' }
    ],
    exercises: [
      { id: 'ja-ex-008-1', type: 'fill-blank', question: '先生、何時に_____（出かける→尊敬語）ますか。', answer: 'お出かけにな', explanation: '出かける的尊敬语形式是お出かりになる。' },
      { id: 'ja-ex-008-2', type: 'multiple-choice', question: 'Which is proper humble language?', options: ['先生にお会いしました。', '先生にお目にかかりました。', '先生に会われました。', '先生が会いました。'], answer: '先生にお目にかかりました。', explanation: '「会う」的谦逊语是「お目にかかる」。' },
      { id: 'ja-ex-008-3', type: 'fill-blank', question: '私から部長に連絡_____（する→謙譲語）します。', answer: 'させていただき', explanation: 'する的谦逊语是させていただく，表示"请允许我做…"。' },
      { id: 'ja-ex-008-4', type: 'ordering', question: 'Rearrange: (に / ご / 読み / になり / ました / 本 / )', answer: ['本', 'を', 'お読み', 'になり', 'ました'], explanation: '読む的尊敬语是お読みになる。' }
    ],
    language: 'ja',
    difficulty: 'advanced'
  },
  {
    id: 'ja-gp-009',
    title: '条件表現：～ば／～と／～たら／～なら',
    explanation: '日语有四种主要条件表达：～ば（恒常条件/假设）；～たら（一次性条件，强调完成）；～と（必然结果/发现）；～なら（基于话题的建议）。',
    pattern: 'V-eba + ば / V-tara + ら / V-to / N + なら',
    examples: [
      { sentence: '練習**すれば**、上手になります。', translation: '如果练习就会进步。（ば：假设性条件）', highlight: 'すれば' },
      { sentence: '雨が**止んだら**、出かけましょう。', translation: '雨停了就出门吧。（たら：一次性完成）', highlight: '止んだら' },
      { sentence: '春に**なると**、桜が咲きます。', translation: '一到春天樱花就开。（と：必然结果）', highlight: 'なると' }
    ],
    exercises: [
      { id: 'ja-ex-009-1', type: 'fill-blank', question: 'お金_____（ある→ば形）あれば、旅行に行きたいです。', answer: 'あれ', explanation: 'ある的ば形是あれば。' },
      { id: 'ja-ex-009-2', type: 'multiple-choice', question: 'Which condition form is best? "If you go to Kyoto..."', options: ['京都に行けば、...', '京都に行ったら、...', '京都に行くと、...', '京都に行くなら、...'], answer: '京都に行くなら、...', explanation: '针对对方提到的话题提建议用なら最自然。' },
      { id: 'ja-ex-009-3', type: 'fill-blank', question: 'このボタンを押す_____（と）、音楽が流れます。', answer: 'と', explanation: '机械操作后的必然结果用と。' },
      { id: 'ja-ex-009-4', type: 'ordering', question: 'Rearrange: (暇 / なら / 、 / 映画 / 見 / に / 行きましょう / )', answer: ['暇', 'なら', '、', '映画', 'に', '見', 'に', '行きましょう'], explanation: '暇なら = 如果有空的话（话题条件），后面接建议。' }
    ],
    language: 'ja',
    difficulty: 'intermediate'
  },
  {
    id: 'ko-gp-001',
    title: '입니다 / 입니다 (基本终结词尾)',
    explanation: '입니다/습니다是韩语中最基本的正式敬语终结词尾。有收音（받침）的词干用～습니다，无收音的用～입니다。否定形式为～이/가 아닙니다。',
    pattern: 'V/Adj stem + 습니다/ㅂ니다 / N + 이/가 아닙니다',
    examples: [
      { sentence: '안녕하**세요**? 저는 학생**입니다**.', translation: '你好！我是学生。', highlight: '입니다' },
      { sentence: '오늘 날씨가 좋**습니다**.', translation: '今天天气很好。', highlight: '좋습니다' },
      { sentence: '이것은 책**이 아닙니다**.', translation: '这不是书。', highlight: '이 아닙니다' }
    ],
    exercises: [
      { id: 'ko-ex-001-1', type: 'fill-blank', question: '저는 한국 사람_____（填入适当结尾）.', answer: '입니다', explanation: '사람无收音，用입니다。' },
      { id: 'ko-ex-001-2', type: 'multiple-choice', question: 'Choose the correct ending for 먹다(eat):', options: ['먹어요', '먹습니다', '먹어입니다', '먹습니까?'], answer: '먹습니다', explanation: '먹다有收音ㄱ，正式敬语用먹습니다。' },
      { id: 'ko-ex-001-3', type: 'fill-blank', question: '그분은 선생님_____（否定形式）.', answer: '이 아닙니다', explanation: '선생님有收音，否定用이 아닙니다。' },
      { id: 'ko-ex-001-4', type: 'ordering', question: 'Rearrange: (이름 / 무엇입니까 / ? / 당신의 / )', answer: ['당신의', '이름', '은', '무엇입니까', '?'], explanation: '您的名字是什么？— 正式敬语疑问句。' }
    ],
    language: 'ko',
    difficulty: 'beginner'
  },
  {
    id: 'ko-gp-002',
    title: '은/는 vs. 이/가 (主题助词 vs. 主格助词)',
    explanation: '은/는提示主题（对比/旧信息），有收音用은，无收音用는；이/가标记主语（新信息/焦点/疑问词焦点），有收音用이，无收音用가。',
    pattern: 'N(받침O) + 은 / N(받침X) + 는 / N(받침O) + 이 / N(박침X) + 가',
    examples: [
      { sentence: '저**는** 김지민**입니다**. 제 이름**이** 김지민입니다.', translation: '我是金智敏。我叫金智敏。', highlight: '는...이' },
      { sentence: '누**가** 왔어요?', translation: '谁来了？（疑问词焦点用가）', highlight: '가' },
      { sentence: '물**은** 마셨지만, 밥**은** 안 먹었어요.', translation: '水喝了，但饭没吃。（对比）', highlight: '은...은' }
    ],
    exercises: [
      { id: 'ko-ex-002-1', type: 'fill-blank', question: '여기_____ 학교입니다. 여기_____ 교실입니다.', answer: ['는', '가'], explanation: '第一句提示主题（这里）用는，第二句介绍新信息（教室）用가。' },
      { id: 'ko-ex-002-2', type: 'multiple-choice', question: 'Which particle is correct? 얼음_____ 차갑다.', options: ['은', '는', '이', '가'], answer: '이', explanation: '描述性质/状态（冰是冷的）用이/가标记主语。' },
      { id: 'ko-ex-002-3', type: 'fill-blank', question: '오늘_____ 비가 옵니다. 내일_____ 맑겠습니다.', answer: ['은', '은'], explanation: '两天都作为主题在对比，都用은/는。' },
      { id: 'ko-ex-002-4', type: 'ordering', question: 'Rearrange: (가 / 뭐 / 좋아하세요 / ? / )', answer: ['뭐', '가', '좋아하세요', '?'], explanation: '뭐（什么）是疑问词作主语焦点，用가。' }
    ],
    language: 'ko',
    difficulty: 'beginner'
  },
  {
    id: 'ko-gp-003',
    title: '을/를 (宾格助词) 与 에/에서 (方位/场所)',
    explanation: '을/를标记宾语，有收音用을，无收音用를；에表示存在的处所/方向/时间点；에서表示动作发生的场所。',
    pattern: 'O + 을/를 + V / Place + 에 + 있다/없다 / Place + 에서 + V',
    examples: [
      { sentence: '나는 사과**를** 먹어요.', translation: '我吃苹果。', highlight: '를' },
      { sentence: '학교**에** 학생이 있어요.', translation: '学校里有学生。', highlight: '에' },
      { sentence: '도서관**에서** 공부해요.', translation: '在图书馆学习。', highlight: '에서' }
    ],
    exercises: [
      { id: 'ko-ex-003-1', type: 'fill-blank', question: '저는 카페_____ 커피_____ 마셔요.', answer: ['에서', '를'], explanation: '카페是动作发生的场所用에서，커피是宾语用를。' },
      { id: 'ko-ex-003-2', type: 'multiple-choice', question: 'Choose the correct particles: 친구_____ 만납니다. 서울_____ 살아요.', options: ['를 / 에', '를 / 에서', '을 / 에', '을 / 에서'], answer: '를 / 에서', explanation: '만나다的宾语用를，살다的居住地用에서。' },
      { id: 'ko-ex-003-3', type: 'fill-blank', question: '책상 위_____ 책_____ 있어요.', answer: ['에', '이'], explanation: '存在句：场所用에，存在的主体用이/가。' },
      { id: 'ko-ex-003-4', type: 'ordering', question: 'Rearrange: (한국어 / 에서 / 배워요 / 학교 / / )', answer: ['학교', '에서', '한국어', '를', '배워요'], explanation: '在学校学习韩语 — 에서表示场所，를标记宾语。' }
    ],
    language: 'ko',
    difficulty: 'beginner'
  },
  {
    id: 'ko-gp-004',
    title: '～아/어 주다 (为他人做某事)',
    explanation: '～아/어 주다表示为某人做某事（请对方做某事时用～아/어 주세요）。词干元音为ㅏ/ㅗ时加아 주다，其他加어 주다。하다变为해 주다。',
    pattern: 'V-stem + 아/어 주다 / V-stem + 아/어 주세요',
    examples: [
      { sentence: '제발 도와**주세요**!', translation: '请帮帮我！', highlight: '주세요' },
      { sentence: '동생에게 편지를 **읽어 줬어요**.', translation: '给弟弟读了信。', highlight: '읽어 줬어요' },
      { sentence: '선생님께 질문**해 드렸어요**.', translation: '帮（向老师）问了问题。', highlight: '해 드렸어요' }
    ],
    exercises: [
      { id: 'ko-ex-004-1', type: 'fill-blank', question: '잠깐 기다려_____（请稍等）.', answer: '주세요', explanation: '기다리다的词干以ㅣ结尾，属于其他元音组，加어 주세요。' },
      { id: 'ko-ex-004-2', type: 'multiple-choice', question: 'What is the correct form of 가르치다(teach) + 아/어 주다?', options: ['가르쳐 주다', '가르아 주다', '가르쳐 주었다', 'Both A and C'], answer: 'Both A and C', explanation: '가르치다 → 가르쳐 주다（现在），过去式为가르쳐 주었다。' },
      { id: 'ko-ex-004-3', type: 'fill-blank', question: '할머니께 짐을_____（들다 → 为奶奶做）드렸어요.', answer: '들어', explanation: '들다词干以ㄹ结尾，实际发音脱落为들어 주다/들어 드리다。' },
      { id: 'ko-ex-004-4', type: 'ordering', question: 'Rearrange: (가르쳐 / 주세요 / 한국어 / 저에게 / / )', answer: ['저', '에게', '한국어', '를', '가르쳐', '주세요'], explanation: '请教我韩语 — 가르치다 + 어 주세요 = 가르쳐 주세요。' }
    ],
    language: 'ko',
    difficulty: 'intermediate'
  },
  {
    id: 'ko-gp-005',
    title: '～(으)면 (条件/假设)',
    explanation: '～(으)면表示"如果/假如"的条件假设。有收音的词干加으면，无收音的加면。可与各种时态、语尾结合使用。',
    pattern: 'V/Adj-stem + (으)면 + result clause',
    examples: [
      { sentence: '내일 비가 **오면**, 등교하지 않겠어요.', translation: '如果明天下雨，我就不去上学了。', highlight: '오면' },
      { sentence: '돈이 **있으면**, 여행하고 싶어요.', translation: '有钱的话想去旅行。', highlight: '있으면' },
      { sentence: '시간 **나면**, 영화 보러 가요.', translation: '有时间的话就去看电影。', highlight: '나면' }
    ],
    exercises: [
      { id: 'ko-ex-005-1', type: 'fill-blank', question: '날씨가 좋_____（好 → 条件形）, 산책하러 가요.', answer: '으면', explanation: '좋다有收音ㅎ，条件形为좋으면。' },
      { id: 'ko-ex-005-2', type: 'multiple-choice', question: 'Choose the correct conditional form:', options: ['만나면, 만났으면, 만난으면, Both A and B are correct.'], answer: 'Both A and B are correct.', explanation: '만나면（一般条件）和 만났으면（过去/确认条件）都可以使用。' },
      { id: 'ko-ex-005-3', type: 'fill-blank', question: '이 약을_____（먹다 → 条件形）, 나을 거예요.', answer: '먹으면', explanation: '먹다有收音ㄱ，条件形为먹으면。' },
      { id: 'ko-ex-005-4', type: 'ordering', question: 'Rearrange: (싶으면 / 돈 / / 빌려 / , / 말씀하세요 / )', answer: ['돈', '이', '필요하시면', '말씀하세요', '', '빌려', '드릴게요'], explanation: '如果您需要钱的话，请告诉我，我会借给您。' }
    ],
    language: 'ko',
    difficulty: 'intermediate'
  },
  {
    id: 'ko-gp-006',
    title: '～(으)ㄹ 수 있다/없다 (可能性)',
    explanation: '～(으)ㄹ 수 있다表示"能够/可以"，～(으)ㄹ 수 없다表示"不能/不可以"。有收音加을 수，无收音加ㄹ 수。',
    pattern: 'V-stem + (으)ㄹ 수 있다/없다',
    examples: [
      { sentence: '저는 한국어**를 할 수 있어요**.', translation: '我会说韩语。', highlight: '할 수 있어요' },
      { sentence: '오늘은 바쁘**서 갈 수 없어요**.', translation: '今天太忙了不能去。', highlight: '갈 수 없어요' },
      { sentence: '이 문제는 혼자** 풀 수 없을 것 같아요**.', translation: '这个问题一个人大概解不了。', highlight: '풀 수 없을 것 같아요' }
    ],
    exercises: [
      { id: 'ko-ex-006-1', type: 'fill-blank', question: '수영장에서 수영을_____（하다 → 可能性）요.', answer: '할 수 있', explanation: '하다无收音，可能性形为할 수 있다。' },
      { id: 'ko-ex-006-2', type: 'multiple-choice', question: '"Cannot read" in Korean is:', options: ['읽을 수 없다', '읽을 수 안 한다', '안 읽을 수 있다', '못 읽다 only'], answer: '읽을 수 없다', explanation: '标准的"不能"表达是～(으)ㄹ 수 없다。' },
      { id: 'ko-ex-006-3', type: 'fill-blank', question: '여기에서 사진을_____（찍다 → 否定可能性）요.', answer: '찍을 수 없', explanation: '찍다有收音ㄱ，否定可能性为찍을 수 없다。' },
      { id: 'ko-ex-006-4', type: 'ordering', question: 'Rearrange: (수 / 할 / 이 / 일 / 있을까요 / ? / )', answer: ['이', '일', '을', '할', '수', '있을까요', '?'], explanation: '这件事能做吗？— ㄹ 수 있을까요表示委婉的可能性询问。' }
    ],
    language: 'ko',
    difficulty: 'beginner'
  },
  {
    id: 'ko-gp-007',
    title: '～았/었던 / ～던 (过去回想)',
    explanation: '～았/었던表示曾经经历过的事物（曾…过的）；～던表示过去持续的状态或反复的动作（以前常常…的/那时…着的）。',
    pattern: 'V-stem + 았/었던 / V-stemp + 던',
    examples: [
      { sentence: '어릴 때 **자주 갔던** 곳이에요.', translation: '小时候经常去的地方。', highlight: '갔던' },
      { sentence: '작년에 **읽었던** 책을 다시 읽고 싶어요.', translation: '想重读去年读过的那本书。', highlight: '읽었던' },
      { sentence: '옆자리에 **앉던** 사람이 일어났어요.', translation: '坐在旁边的那个人站起来了。', highlight: '앉던' }
    ],
    exercises: [
      { id: 'ko-ex-007-1', type: 'fill-blank', question: '그분은 내가 어렸을 때_____（자주 만나다 → 回想）분이에요.', answer: '자주 만나던', explanation: '过去反复/持续的状态用～던。' },
      { id: 'ko-ex-007-2', type: 'multiple-choice', question: 'Difference between 았/었던 and 던:', options: ['았/었던 = completed experience; 던 = ongoing/recalling past state', 'No difference; interchangeable', '았/었던 is more formal than 던', '던 is only for adjectives'], answer: '았/었던 = completed experience; 던 = ongoing/recalling past state', explanation: '～았/었던侧重经历完成，～던侧重当时的状态回顾。' },
      { id: 'ko-ex-007-3', type: 'fill-blank', question: '어제_____（먹다 → 回想完成）음식이 맛있었어요.', answer: '먹었던', explanation: '昨天吃过（已完成体验）的食物，用～었던。' },
      { id: 'ko-ex-007-4', type: 'ordering', question: 'Rearrange: (노래 / 자주 / 부르던 / 그 / / )', answer: ['그', '자주', '부르던', '노래'], explanation: '那首经常唱的歌 — 자주 부르던（过去反复做的动作）。' }
    ],
    language: 'ko',
    difficulty: 'intermediate'
  },
  {
    id: 'ko-gp-008',
    title: '～(스)ㅁ (名词化) 与 ～아/어서 (原因/顺序)',
    explanation: '～(스)ㅁ将动词/形容词名词化，常用于书面语；～아/어서表示原因（不可接命令/共动句）或动作先后顺序。',
    pattern: 'V/Adj + (스)ㅁ / V-stem + 아/어서 + reason/result',
    examples: [
      { sentence: '그는 **옴**을 확인했다.', translation: '他确认了他的到来。（名词化：옴 = 来）', highlight: '옴' },
      { sentence: '배가 **아파서** 병원에 갔어요.', translation: '因为肚子疼去了医院。', highlight: '아파서' },
      { sentence: '집에 **와서** 씻었어요.', translation: '回家后洗了澡。（顺序）', highlight: '와서' }
    ],
    exercises: [
      { id: 'ko-ex-008-1', type: 'fill-blank', question: '그는 이 사실을_____（알다 → 名词化）을 부인했다.', answer: '알', explanation: '알다的名词化形式是알ㅁ = 앎。' },
      { id: 'ko-ex-008-2', type: 'multiple-choice', question: 'Which sentence is grammatically WRONG?', options: ['비가 와서 우산을 쓰세요.', '늦어서 지각했어요.', '피곤해서 일찍 잤어요.', '공부해서 시험을 잘 봤어요.'], answer: '비가 와서 우산을 쓰세요.', explanation: '～아/어서表示原因时不能接命令句（으세요）。' },
      { id: 'ko-ex-008-3', type: 'fill-blank', question: '돈이_____（없다 → 原因）, 살 수 없었어요.', answer: '없어서', explanation: '没有钱所以买不起 — 없다的아/어서形式是없어서。' },
      { id: 'ko-ex-008-4', type: 'ordering', question: 'Rearrange: (만나서 / 반가워요 / / 친구 / 를 / )', answer: ['친구', '를', '만나서', '반가워요'], explanation: '见到朋友很高兴 — ～아/어서在此表示原因。' }
    ],
    language: 'ko',
    difficulty: 'intermediate'
  },
  {
    id: 'ko-gp-009',
    title: '～게 하다 / ~도록 하다 (使动表达)',
    explanation: '～게 하让/使某人做某事（直接使动）；～도록 하让/安排使得…（更正式，含"使之如此"之意）。',
    pattern: 'O + V-stem + 게 하다 / O + V-stemp + 도록 하다',
    examples: [
      { sentence: '선생님은 학생들을 조용히**하게 했다**.', translation: '老师让学生们安静下来。', highlight: '게 했다' },
      { sentence: '어머니는 동생에게 청소**를 시켰어요**.', translation: '妈妈让弟弟做了清洁。', highlight: '시켰어요' },
      { sentence: '회사는 직원들이 휴식**취하도록 했다**.', translation: '公司安排员工休息。', highlight: '취하도록 했다' }
    ],
    exercises: [
      { id: 'ko-ex-009-1', type: 'fill-blank', question: '부모님은 저에게 피아노_____（배우다 → 使动）셨어요.', answer: '배우게 하', explanation: '배우다 + 게 하다 = 배우게 하다（让我学钢琴）。' },
      { id: 'ko-ex-009-2', type: 'multiple-choice', question: 'What does "그 영화는 나를 울게 했어요" mean?', options: ['That movie made me cry.', 'That movie cried for me.', 'I made that movie cry.', 'That movie could cry.'], answer: 'That movie made me cry.', explanation: '～게 하다 = 使役，那部电影让我哭了。' },
      { id: 'ko-ex-009-3', type: 'fill-blank', question: '팀장은 팀원들에게 의견을_____（말하다 → 使动·正式）도록 했다.', answer: '말하', explanation: '更正式的使动表达用～도록 하다。' },
      { id: 'ko-ex-009-4', type: 'ordering', question: 'Rearrange: (웃게 / 그 / 했어요 / 사람 / / 만든 / )', answer: ['그', '사람', '은', '나를', '웃게', '했어요'], explanation: '那个人让我笑了 — 나를 웃게 했다。' }
    ],
    language: 'ko',
    difficulty: 'advanced'
  }
];

export default grammarData;
