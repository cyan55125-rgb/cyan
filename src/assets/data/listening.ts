import type { ListeningMaterial } from '../../types/listening';

export const listeningMaterials: ListeningMaterial[] = [
  {
    id: 'en-001',
    title: 'At the Coffee Shop',
    content: `Good morning! Welcome to Sunrise Coffee. What can I get for you today?

Hi, I'd like a large latte, please. And do you have any pastries?

Yes, we have croissants, muffins, and chocolate chip cookies fresh from the oven.

I'll take a blueberry muffin, then. That sounds delicious.

Great choice! Anything else for you?

No, that's all. How much is it?

That'll be six dollars and fifty cents. Would you like to pay by card or cash?

Card, please. Here you go.

Thank you! Here's your receipt. Your order will be ready in about three minutes. We'll call your name when it's ready.

Thanks a lot!

You're welcome. Have a wonderful day!`,
    translation: '早上好！欢迎光临Sunrise咖啡店。今天想喝点什么？\n\n嗨，我想要一杯大杯拿铁。请问有糕点吗？\n\n有的，我们有牛角包、松饼和刚出炉的巧克力曲奇。\n\n那我就要一个蓝莓松饼吧，听起来很好吃。\n\n好选择！还需要别的吗？\n\n不用了，就这些。多少钱？\n\n一共六块五。您刷卡还是付现金？\n\n刷卡，给您。\n\n谢谢！这是您的小票。您的订单大约三分钟就好，好了我们会叫您的名字。\n\n非常感谢！\n\n不客气，祝您今天愉快！',
    difficulty: 'beginner',
    duration: 65,
    language: 'en',
    category: '日常对话',
    questions: [
      {
        id: 'en-001-q1',
        question: 'What did the customer order to drink?',
        options: ['A large cappuccino', 'A large latte', 'A cup of tea', 'A black coffee'],
        answer: 1,
      },
      {
        id: 'en-001-q2',
        question: 'How much did the customer pay?',
        options: ['$5.50', '$6.00', '$6.50', '$7.00'],
        answer: 2,
      },
      {
        id: 'en-001-q3',
        question: 'What pastry did the customer choose?',
        options: ['A croissant', 'A chocolate chip cookie', 'A blueberry muffin', 'A donut'],
        answer: 2,
      },
    ],
  },
  {
    id: 'en-002',
    title: 'Weather Forecast',
    content: `Good evening, this is your local weather forecast for the greater metropolitan area. Tonight, we're expecting clear skies with temperatures dropping to around twelve degrees Celsius. It's going to be a cool and crisp night, so you might want to grab a light jacket if you're heading out.

Moving on to tomorrow's forecast. We'll see partly cloudy skies in the morning, with clouds increasing throughout the afternoon. There's a thirty percent chance of light showers in the late afternoon and early evening. Highs will reach twenty-two degrees, which is slightly above average for this time of year.

Looking ahead to the weekend, Saturday looks fantastic — sunny skies and warm temperatures around twenty-five degrees. Perfect weather for outdoor activities. However, Sunday brings a cold front moving in from the north, so expect cooler conditions with possible thunderstorms in the afternoon. Temperatures will drop to eighteen degrees on Sunday.

That's your forecast. Stay tuned for traffic updates after the break.`,
    translation: '晚上好，这是大都市区的本地天气预报。今晚预计晴朗，气温将降至约12摄氏度。今晚会凉爽宜人，如果您出门的话，可能需要带一件薄外套。\n\n来看明天的预报。上午多云转晴，下午云量逐渐增加。下午晚些时候和傍晚有30%的概率出现小雨。最高温度将达到22摄氏度，比这个季节的平均水平略高。\n\n展望周末，周六天气非常好——晴空万里，温暖舒适，气温约25摄氏度。非常适合户外活动。不过周日会有冷空气从北方袭来，预计气温下降，下午可能有雷暴。周日气温将降至18摄氏度。\n\n以上就是天气预报。广告后请继续关注交通信息。',
    difficulty: 'intermediate',
    duration: 85,
    language: 'en',
    category: '新闻',
    questions: [
      {
        id: 'en-002-q1',
        question: 'What is tonight\'s expected low temperature?',
        options: ['10°C', '12°C', '15°C', '8°C'],
        answer: 1,
      },
      {
        id: 'en-002-q2',
        question: 'What is the chance of rain tomorrow afternoon?',
        options: ['10%', '20%', '30%', '50%'],
        answer: 2,
      },
      {
        id: 'en-002-q3',
        question: 'How will the weather change on Sunday?',
        options: ['It will be warmer and sunnier', 'A cold front will bring cooler weather and possible storms', 'It will be the same as Saturday', 'There will be heavy snow'],
        answer: 1,
      },
    ],
  },
  {
    id: 'en-003',
    title: 'Job Interview',
    content: `Good morning, Sarah. Thank you for coming in today. Please, have a seat.

Good morning, Mr. Thompson. Thank you for having me.

I've reviewed your resume, and I'm quite impressed with your background in digital marketing. Can you tell me a little bit about your experience managing social media campaigns?

Of course. In my previous role at TechStart, I managed the company's social media presence across four platforms: Instagram, Twitter, LinkedIn, and TikTok. Over two years, I grew our follower base from five thousand to over forty-five thousand, and increased engagement rates by sixty percent through data-driven content strategies.

That's impressive growth. Can you give me an example of a particularly challenging campaign you worked on?

Certainly. Last year, we launched a product for a very niche audience — professional photographers. The challenge was that our usual broad-reach approach wasn't working. So I conducted deep audience research, partnered with three photography influencers, and created a series of behind-the-scenes content. The campaign exceeded our target by forty percent and brought in over two hundred qualified leads.

Excellent. How do you handle tight deadlines and competing priorities?

I'm a big believer in prioritization frameworks. I use the Eisenhower Matrix daily to categorize tasks by urgency and importance. For the marketing team, I also implemented a shared project management tool so everyone has visibility into deadlines and dependencies. Communication is key — I make sure to flag potential bottlenecks early.

One final question: where do you see yourself in three years?

In three years, I hope to be leading a marketing team, driving strategy at a higher level. I'm passionate about combining creativity with analytics, and I see this company as the perfect place to grow those skills while making a real impact.

Thank you, Sarah. We'll be in touch by the end of the week.`,
    translation: '早上好，Sarah。感谢你今天来参加面试。请坐。\n\n早上好，Thompson先生。感谢您给我这次机会。\n\n我看过你的简历了，你在数字营销方面的背景让我印象深刻。能谈谈你在管理社交媒体活动方面的经验吗？\n\n当然可以。在TechStart的前一份工作中，我负责管理公司在四个平台上的社交媒体 presence：Instagram、Twitter、LinkedIn和TikTok。两年间，我将粉丝数从5000增长到超过45000个，通过数据驱动的内容策略将参与率提高了60%。\n\n增长很惊人。能举一个特别有挑战性的活动案例吗？\n\n当然可以。去年我们为一款面向非常小众受众——专业摄影师——的产品做推广。挑战在于我们通常广泛触达的方法不起作用。所以我做了深入的受众研究，与三位摄影领域的影响者合作，并制作了一系列幕后内容。该活动超额完成目标40%，带来了200多个合格的销售线索。\n\n太棒了。你如何处理紧迫的截止日期和相互冲突的优先事项？\n\n我是优先级框架的坚定信奉者。我每天使用艾森豪威尔矩阵来按紧急性和重要性对任务分类。对于营销团队，我还引入了一个共享的项目管理工具，让每个人都能看到截止日期和依赖关系。沟通是关键——我会尽早标记潜在的瓶颈。\n\n最后一个问题：三年后你希望自己处于什么位置？\n\n三年后，我希望能够领导一个营销团队，在更高层次上推动战略。我对将创意与分析相结合充满热情，我认为贵公司是在发展这些技能同时产生真正影响的完美场所。\n\n谢谢你，Sarah。我们会在本周结束前联系你。',
    difficulty: 'upper-intermediate',
    duration: 150,
    language: 'en',
    category: '日常对话',
    questions: [
      {
        id: 'en-003-q1',
        question: 'What was Sarah\'s achievement in growing followers?',
        options: ['From 5,000 to 20,000', 'From 5,000 to 35,000', 'From 5,000 to 45,000', 'From 10,000 to 45,000'],
        answer: 2,
      },
      {
        id: 'en-003-q2',
        question: 'What framework does Sarah use for task prioritization?',
        options: ['Pomodoro Technique', 'Eisenhower Matrix', 'Agile Scrum', 'Kanban Board'],
        answer: 1,
      },
      {
        id: 'en-003-q3',
        question: 'What niche audience was the challenging campaign targeting?',
        options: ['College students', 'Professional photographers', 'Small business owners', 'Fitness enthusiasts'],
        answer: 1,
      },
    ],
  },
  {
    id: 'en-004',
    title: 'TED Talk: The Power of Sleep',
    content: `What if I told you that there is a single activity that can dramatically improve your memory, enhance your creativity, regulate your emotions, and even extend your lifespan? And what if I also told you that nearly one-third of adults are chronically deprived of it? I'm talking, of course, about sleep.

For decades, sleep was dismissed as merely a passive state — a time when the brain simply shut down and the body rested. But modern neuroscience has completely revolutionized our understanding. Sleep is not a passive state at all; it's an active, highly orchestrated process involving complex interactions between different brain regions.

Let me walk you through what happens during a typical night of sleep. You cycle through four distinct stages approximately every ninety minutes. The first two stages are light sleep — your brain waves slow down, your heart rate drops. Then comes deep slow-wave sleep, which is absolutely critical for physical restoration, immune function, and what scientists call "memory consolidation" — the process by which short-term memories are transferred into long-term storage.

Finally, there's REM sleep — rapid eye movement sleep — the stage where most vivid dreaming occurs. This is where your brain processes emotional experiences, makes unexpected connections between seemingly unrelated ideas, and essentially reorganizes your knowledge. This is why you often wake up with solutions to problems that seemed unsolvable the night before.

The research is unequivocal: chronic sleep deprivation is linked to increased risk of heart disease, diabetes, depression, and Alzheimer's disease. Yet we live in a culture that celebrates burnout and wears sleep deprivation like a badge of honor. This has to change. Your brain needs sleep the way your body needs food and water. It's not a luxury — it's a biological necessity.

So tonight, when you're tempted to scroll through your phone just one more time, remember: every hour of quality sleep is an investment in the person you want to become. Thank you.`,
    translation: '如果我告诉你，有一项活动可以显著改善你的记忆力、增强创造力、调节情绪，甚至延长寿命呢？如果我还告诉你，近三分之一的成年人长期缺乏这项活动呢？当然，我说的是睡眠。\n\n几十年来，睡眠被认为只是一种被动状态——大脑只是关闭、身体休息的时间。但现代神经科学彻底改变了我们的理解。睡眠根本不是被动状态；它是一个活跃的、高度协调的过程，涉及不同大脑区域之间复杂的相互作用。\n\n让我带你了解典型夜晚睡眠中发生的事情。你大约每90分钟循环经历四个不同的阶段。前两个阶段是浅睡眠——你的脑波减慢，心率下降。然后是深度慢波睡眠，这对身体恢复、免疫功能和科学家所谓的"记忆巩固"至关重要——短期记忆转化为长期存储的过程。\n\n最后是REM睡眠——快速眼动睡眠——大多数生动梦境发生的阶段。在这个阶段，你的大脑处理情感体验，在看似无关的想法之间建立意想不到的联系，本质上重新组织你的知识。这就是为什么你经常在早上醒来时找到了前一天晚上似乎无法解决的问题的答案。\n\n研究结论明确：慢性睡眠不足与心脏病、糖尿病、抑郁症和阿尔茨海默病的风险增加相关。然而我们生活在一个赞美倦怠、把睡眠不足当作荣誉徽章的文化中。这必须改变。你的大脑需要睡眠，就像你的身体需要食物和水一样。这不是奢侈品——这是一种生物学必要性。\n\n所以今晚，当你忍不住再刷一次手机时，请记住：每一个小时的优质睡眠都是对你想要成为的那个人的投资。谢谢。',
    difficulty: 'advanced',
    duration: 210,
    language: 'en',
    category: '演讲',
    questions: [
      {
        id: 'en-004-q1',
        question: 'According to the speaker, how often do sleep cycles repeat?',
        options: ['Every 60 minutes', 'Every 75 minutes', 'Every 90 minutes', 'Every 120 minutes'],
        answer: 2,
      },
      {
        id: 'en-004-q2',
        question: 'Which sleep stage is described as critical for "memory consolidation"?',
        options: ['Light sleep (Stage 1-2)', 'Deep slow-wave sleep', 'REM sleep', 'All stages equally'],
        answer: 1,
      },
      {
        id: 'en-004-q3',
        question: 'What is the speaker\'s main message about sleep in modern society?',
        options: ['Sleep is becoming less important due to technology', 'Society celebrates burnout but sleep is a biological necessity', 'Most people already get enough sleep', 'Sleep research is still inconclusive'],
        answer: 1,
      },
    ],
  },
  {
    id: 'en-005',
    title: 'At the Airport',
    content: `Excuse me, where is the check-in counter for Flight 203 to London?

That would be Counter 12, right over there by the blue sign. But you should hurry — boarding starts in forty minutes.

Oh no, I hope I have enough time. Is this the right queue?

Yes, this is the economy class line for international flights. Do you have your passport and boarding pass ready?

Here they are. By the way, how many bags can I check in?

You're allowed one checked bag up to twenty-three kilograms, plus one carry-on item.

Perfect, I only have one suitcase. It should be under the limit.

Alright, place your bag on the scale, please... Twenty-one kilograms. That's fine. Here's your boarding pass. Gate B7, boarding at 10:30.

Thank you so much! And where is security check?

Go straight ahead, then turn left. You'll see the security entrance.

Great, thanks for your help!

Have a nice flight!`,
    translation: '打扰一下，飞往伦敦的203航班办理登机手续的柜台在哪里？\n\n那是12号柜台，就在那边蓝色标志旁边。但你得抓紧时间了——40分钟后开始登机。\n\n哦不，希望我还来得及。这是正确的排队队伍吗？\n\n是的，这是国际航班经济舱的队伍。你准备好护照和登机牌了吗？\n\n在这里。顺便问一下，我可以托运几件行李？\n\n你可以托运一件不超过23公斤的行李，外加一件随身携带物品。\n\n太好了，我只有一个箱子。应该不会超重。\n\n好的，请把行李放在秤上……21公斤。没问题。这是你的登机牌。B7号登机口，10:30开始登机。\n\n非常感谢！安检在哪里？\n\n一直往前走，然后左转。你会看到安检入口。\n\n好的，谢谢你的帮助！\n\n祝你旅途愉快！',
    difficulty: 'beginner',
    duration: 70,
    language: 'en',
    category: '日常对话',
    questions: [
      {
        id: 'en-005-q1',
        question: 'Which gate is the flight departing from?',
        options: ['Gate A3', 'Gate B7', 'Gate C12', 'Gate D5'],
        answer: 1,
      },
      {
        id: 'en-005-q2',
        question: 'How much does the passenger\'s suitcase weigh?',
        options: ['19 kg', '21 kg', '23 kg', '25 kg'],
        answer: 1,
      },
      {
        id: 'en-005-q3',
        question: 'What is the destination of Flight 203?',
        options: ['Paris', 'New York', 'London', 'Tokyo'],
        answer: 2,
      },
    ],
  },
  {
    id: 'en-006',
    title: 'Restaurant Reservation',
    content: `Hello, Bella Trattoria. How may I help you?

Hi, I'd like to make a reservation for this Friday evening, please.

Certainly. For how many people?

Four adults. We're celebrating my parents' anniversary.

That's lovely! What time would you prefer?

Around seven o'clock, if possible.

Let me check... Yes, we have a table available at seven. Would you prefer indoor seating or our garden terrace?

The terrace sounds wonderful, weather permitting. Oh, and my father is allergic to shellfish — are there dishes he should avoid?

Not to worry. Our chef is excellent at accommodating dietary restrictions. Just let your server know when you arrive, and they'll guide you through the safe options.

That's very reassuring. Do we need to deposit anything to hold the reservation?

No deposit required. However, if you need to cancel or change your plans, please let us know at least twenty-four hours in advance.

Understood. May I have your name, please?

It's Jennifer Chen. C-H-E-N.

Perfect, Ms. Chen. Your reservation is confirmed for Friday at seven P.M., four guests, terrace seating. We look forward to seeing you!

Thank you so much. Goodbye!`,
    translation: '您好，Bella意大利餐厅。有什么可以帮您的吗？\n\n嗨，我想预订本周五晚上的位置。\n\n好的。几位用餐？\n\n四位成年人。我们要庆祝我父母的结婚纪念日。\n\n真好！您希望几点？\n\n如果可以的话，大概七点左右。\n\n让我查一下……是的，七点有空位。您希望坐在室内还是我们的花园露台？\n\n露台听起来很棒，只要天气允许的话。噢，我父亲对贝类过敏——有什么菜是他需要避免的吗？\n\n不用担心。我们的厨师非常擅长满足饮食限制需求。到达时告诉服务员就行，他们会为您推荐安全的选择。\n\n这让人放心多了。需要交定金保留预订吗？\n\n不需要定金。不过，如果您需要取消或更改计划，请至少提前24小时通知我们。\n明白了。请问您的姓名？\n\nJennifer Chen。C-H-E-N。\n\n好的，Chen女士。您的预订已确认：周五晚上7点，四位客人，露台座位。期待您的光临！\n\n非常感谢。再见！',
    difficulty: 'elementary',
    duration: 80,
    language: 'en',
    category: '日常对话',
    questions: [
      {
        id: 'en-006-q1',
        question: 'Why is the family making a reservation?',
        options: ["For a birthday party", "For the parents' anniversary", "For a business meeting", "For a graduation celebration"],
        answer: 1,
      },
      {
        id: 'en-006-q2',
        question: 'What special dietary requirement was mentioned?',
        options: ['Vegetarian', 'Gluten-free', 'Shellfish allergy', 'Lactose intolerance'],
        answer: 2,
      },
      {
        id: 'en-006-q3',
        question: 'How far in advance must they cancel if needed?',
        options: ['12 hours', '24 hours', '48 hours', 'No cancellation needed'],
        answer: 1,
      },
    ],
  },
  {
    id: 'en-007',
    title: 'Science News: Mars Exploration',
    content: `Welcome to Science Weekly. Today's headline story: NASA's Perseverance rover has made a groundbreaking discovery on the surface of Mars that could reshape our understanding of the Red Planet's history.

Scientists announced yesterday that the rover detected organic molecules in ancient rock samples collected from the Jezero Crater. Now, before you get too excited, organic molecules don't necessarily mean life — they're simply carbon-based compounds that can form through both biological and geological processes. However, the concentration and variety found in these samples are significantly higher than what previous missions have observed.

Dr. Elena Vasquez, the mission's lead geochemist, explained the significance: "What makes this finding remarkable is the context. These rocks were once submerged under water billions of years ago, when Mars had rivers and lakes. Finding complex organic compounds in an ancient lakebed strongly suggests that the chemical building blocks for life were present."

The rover is now heading toward the delta region of the crater, where scientists hope to find sediment layers that could contain fossils or other biosignatures. Meanwhile, the European Space Agency is planning a sample return mission for 2028, which would bring these precious Martian rocks back to Earth for detailed laboratory analysis.

This discovery adds to a growing body of evidence that Mars was once habitable. Whether life actually emerged there remains one of the most compelling unanswered questions in science.`,
    translation: '欢迎收听《科学周刊》。今天的头条新闻：NASA的"毅力"号火星车在火星表面取得了可能重塑我们对红色星球历史理解的突破性发现。\n\n科学家昨天宣布，火星车在耶泽罗陨石坑采集的古老岩石样本中检测到了有机分子。现在，在你过于兴奋之前，有机分子不一定意味着生命——它们只是可以通过生物和地质过程形成的碳基化合物。然而，这些样本中发现有机分子的浓度和多样性明显高于以往任务观察到的结果。\n\n任务首席地球化学家Elena Vasquez博士解释了这一发现的意义："这一发现的非凡之处在于其背景。这些岩石数十亿年前曾被水覆盖，那时火星上有河流和湖泊。在古老的湖床中发现复杂的有机化合物强烈表明生命存在的化学基础曾经存在。"\n\n火星车现在正前往陨石坑的三角洲区域，科学家们希望能找到可能含有化石或其他生物特征的沉积层。与此同时，欧洲航天局正在计划2028年的样本返回任务，将这些珍贵的火星岩石带回地球进行详细的实验室分析。\n\n这一发现进一步证明火星曾经适合居住。生命是否真的在那里出现仍然是科学中最引人入胜的未解问题之一。',
    difficulty: 'intermediate',
    duration: 120,
    language: 'en',
    category: '新闻',
    questions: [
      {
        id: 'en-007-q1',
        question: 'Where were the rock samples collected from?',
        options: ['Olympus Mons', 'Jezero Crater', 'Valles Marineris', 'The North Pole'],
        answer: 1,
      },
      {
        id: 'en-007-q2',
        question: 'What did Dr. Vasquez say about the rocks\' history?',
        options: ['They were formed by volcanic activity', 'They were once underwater in an ancient lakebed', 'They came from an asteroid impact', 'They are younger than expected'],
        answer: 1,
      },
      {
        id: 'en-007-q3',
        question: 'When is the planned sample return mission?',
        options: ['2025', '2026', '2028', '2030'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ja-001',
    title: '自己紹介',
    content: `はじめまして。田中太郎といいます。

田中さん、初めまして。私の名前は山田花子です。よろしくお願いします。

山田さんはどちらからいらっしゃったんですか？

東京から来ました。田中さんの出身はどこですか？

私は大阪生まれですが、今は京都に住んでいます。

あ、京都ですか。いい場所ですね。何をしているんですか？

大学生です。現在、二年生で、文学部で勉強しています。専攻は日本語教育です。

へえ、先生を目指しているんですね。素敵な夢ですね。

はい、将来は外国人に日本語を教えたいと思っています。山田さんの仕事は何ですか？

私は会社員です。IT企業でシステムエンジニアとして働いています。

忙しそうですね。趣味は何ですか？

読書と映画鑑賞が好きです。特に時代劇が大好きです。田中さんは？

僕はサッカーと料理が好きです。週末によく友達とサッカーをしたり、新しいレシピに挑戦したりしています。

楽しそうですね。またぜひお話しましょう！

はい、楽しみにしています。`,
    translation: '初次见面，我叫田中太郎。\n\n田中先生，初次见面。我叫山田花子。请多关照。\n\n山田小姐是从哪里来的？\n\n我从东京来的。田中先生的家乡是哪里？\n\n我出生在大阪，但现在住在京都。\n\n啊，京都啊。好地方啊。你是做什么工作的？\n\n我是大学生。现在读二年级，在文学部学习。专业是日语教育。\n\n诶，是想当老师啊。真是个美好的梦想。\n\n是的，将来我想教外国人日语。山田小姐的工作是什么？\n\n我是公司职员。在IT企业做系统工程师。\n\n看起来很忙呢。兴趣爱好是什么？\n\n我喜欢读书和看电影。特别喜欢时代剧。田中先生呢？\n\n我喜欢足球和做饭。周末经常和朋友踢球，或者挑战新食谱。\n\n听起来很有趣呢。以后一定要多聊聊天！\n\n好的，我很期待。',
    difficulty: 'beginner',
    duration: 75,
    language: 'ja',
    category: '日常对话',
    questions: [
      {
        id: 'ja-001-q1',
        question: '山田花子の専攻は何ですか？',
        options: ['経済学', '日本語教育', 'IT', '医学'],
        answer: 1,
      },
      {
        id: 'ja-001-q2',
        question: '田中太郎の趣味は何ですか？',
        options: ['読書と映画', 'サッカーと料理', '旅行と写真', '音楽とダンス'],
        answer: 1,
      },
      {
        id: 'ja-001-q3',
        question: '山田花子はどこから来ましたか？',
        options: ['大阪', '京都', '東京', '神戸'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ja-002',
    title: '道案内',
    content: `すみません、この辺りに郵便局はありますか？

はい、ありますよ。この道をまっすぐ行って、二つ目の信号を右に曲がってください。

右ですね。どれくらいかかりますか？

歩いて十分くらいです。右に曲がると、大きなスーパーが見えます。そのスーパーの隣が郵便局です。

ありがとうございます。あのう、もう一つ聞きたいのですが、近くに駅もありますか？

ええ、郵便局を過ぎてさらにまっすぐ行くと、左側に駅が見えます。歩いて五分ぐらいです。

それは助かりました。今日は天気がいいので、歩いて行きます。

そうですね。でも午後から曇る予報ですから、傘を持って行ったほうがいいかもしれませんよ。

アドバイスありがとうございます。あ、あとコンビニも探しているのですが…

コンビニなら、駅の前にあります。「ローソン」というコンビニです。大きくて見つけやすいですよ。

わかりました。本当にありがとうございました！

どういたしまして。気をつけて行ってくださいね。`,
    translation: '请问，这附近有邮局吗？\n\n有的。沿着这条路直走，在第二个红绿灯处向右转。\n\n向右转是吧。大概要走多久？\n\n走路大约十分钟。向右转后会看到一家大超市，邮局就在超市旁边。\n\n谢谢。嗯，还有一件事想问一下，附近有车站吗？\n\n有的，过了邮局继续直走，左侧就能看到车站。步行大约五分钟。\n\n那太有帮助了。今天天气不错，我走过去吧。\n\n是啊。不过预报说下午会阴天，也许带把伞比较好。\n\n谢谢建议。啊，还有我在找便利店……\n\n便利店的话，车站前面就有一家叫"罗森"的便利店。很大，很容易找到。\n\n明白了。真的非常感谢！\n\n不客气。路上小心哦。',
    difficulty: 'intermediate',
    duration: 65,
    language: 'ja',
    category: '日常对话',
    questions: [
      {
        id: 'ja-002-q1',
        question: '郵便局まで歩いてどのくらいかかりますか？',
        options: ['五分', '十分', '十五分', '二十分'],
        answer: 1,
      },
      {
        id: 'ja-002-q2',
        question: '駅の前にあるコンビニはどれですか？',
        options: ['セブンイレブン', 'ファミリーマート', 'ローソン', 'ミニストップ'],
        answer: 2,
      },
      {
        id: 'ja-002-q3',
        question: '午後の天気予報はどうなっていますか？',
        options: ['晴れ', '雨', '曇り', '雪'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ja-003',
    title: 'ニュース原稿',
    content: `本日のニュースをお伝えします。まず、国内経済についてです。

内閣府が本日発表した今年度第四四半期のGDP速報値によると、実質GDP成長率は前期比年率で三・二％のプラスとなりました。これは市場予想を上回る結果で、個人消費の回復と設備投資の増加が主な要因です。特に自動車産業と半導体関連企業の業績が好調で、製造業全体を牽引しました。

次に、国際ニュースです。環境省は昨日、二〇三五年までに炭素排出量を二〇一三年比で四六％削減する新たな目標を発表しました。再生可能エネルギーの導入拡大や電動車の普及促進などが柱となる政策で、企業に対しては脱炭素への取り組みを加速するよう呼びかけています。

最後に文化ニュースです。京都国立博物館で来月開催される特別展「平安の美」の事前チケット販売が本日から始まりました。国宝十二件、重要文化財八十件以上が展示される予定で、平安時代の絵画、書跡、工芸品などを通じて当時の貴族文化に触れることができます。会期は六月一日から八月三十日までです。

以上、本日のニュースをお伝えしました。`,
    translation: '接下来播报今天的新闻。首先是关于国内经济的内容。\n\n根据内阁府今天公布的本财年第四季度GDP初步数据，实际GDP增长率较上季度换算成年率为正3.2%。这一结果超出了市场预期，主要原因是个人消费恢复和设备投资增加。特别是汽车产业和相关半导体企业业绩良好，带动了制造业整体增长。\n\n接下来是国际新闻。环境省昨天公布了到2035年将碳排放量比2013年减少46%的新目标。扩大可再生能源导入和促进电动汽车普及等将成为政策的支柱，政府呼吁企业加快脱碳努力。\n\n最后是文化新闻。京都国立博物馆下月举办的特展"平安之美"预售门票从今天开始展出。计划展出12件国宝和80件以上的重要文化遗产，通过平安时代的绘画、书法和工艺品等让参观者感受当时的贵族文化。展览期为6月1日至8月30日。\n\n以上就是今天的新闻报道。',
    difficulty: 'advanced',
    duration: 110,
    language: 'ja',
    category: '新闻',
    questions: [
      {
        id: 'ja-003-q1',
        question: '第四四半期の実質GDP成長率はいくらでしたか？',
        options: ['２・１％', '３・２％', '４・５％', '１・８％'],
        answer: 1,
      },
      {
        id: 'ja-003-q2',
        question: '新たな炭素削減目標の期限はいつですか？',
        options: ['２０３０年', '２０３５年', '２０４０年', '２０５０年'],
        answer: 1,
      },
      {
        id: 'ja-003-q3',
        question: '「平安の美」特別展の会期はいつからいつまでですか？',
        options: ['五月一日から七月三十日まで', '六月一日から八月三十日まで', '七月一日から九月三十日まで', '四月一日から六月三十日まで'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ja-004',
    title: '買い物',
    content: `いらっしゃいませ。何かお探しですか？

はい、プレゼントを探しているんです。友人の誕生日なんです。

そうですか。性別と年代は？

女性で、二十代です。予算は三千円くらいです。

三千円ですね。では、こちらのハンカチセットはいかがでしょうか。絹製で、桜の柄が入っています。箱入りで三千二百円です。

きれいですね。でももう少し安いものはありませんか？

こちらの小物入れはいかがでしょう。伝統的な漆塗りで、二千五百円です。実用的だし、デザインも上品です。

それいいですね。色は他にもありますか？

はい、赤と黒と青があります。どちらがお好きですか？

赤でお願いします。包装してもらえますか？

もちろんです。無料でギフトラッピングいたします。メッセージカードも付けますか？

はい、お願いします。「誕生日おめでとう」と書いてください。

かしこまりました。少々お待ちください。……はい、できました。合計二千五百円になります。

カードで払えますか？

はい、クレジットカードも使えます。こちらにサインをお願いします。

ありがとうございました。また来ます！

ありがとうございました。`,
    translation: '欢迎光临。您在找什么吗？\n\n是的，我在找礼物。是送给朋友的生日礼物。\n\n是这样啊。性别和年龄是？\n\n女性，20多岁。预算大约3000日元左右。\n\n3000日元啊。那这条手帕套装怎么样？丝绸材质，带有樱花图案。带礼盒装，3200日元。\n\n真好看呢。不过有没有更便宜一点的？\n\n这个小收纳盒怎么样？传统漆器工艺，2500日元。既实用，设计也很雅致。\n\n这个不错呢。还有其他颜色吗？\n\n有的，有红色、黑色和蓝色。您喜欢哪种颜色？\n\n请给我红色的。可以帮我包装吗？\n\n当然可以。免费提供礼品包装服务。需要附上留言卡吗？\n\n好的，麻烦写上"生日快乐"。\n\n好的，请稍等片刻。……好了，完成了。一共2500日元。\n\n可以刷卡吗？\n\n可以的，信用卡也可以使用。请在这里签名。\n\n谢谢。我还会再来的！\n\n感谢您的光顾。',
    difficulty: 'beginner',
    duration: 70,
    language: 'ja',
    category: '日常对话',
    questions: [
      {
        id: 'ja-004-q1',
        question: 'プレゼントを受け取る人は誰ですか？',
        options: ['両親', '友人', '兄弟', '先生'],
        answer: 1,
      },
      {
        id: 'ja-004-q2',
        question: '最後に買ったものの値段はいくらですか？',
        options: ['２,０００円', '２,５００円', '３,０００円', '３,２００円'],
        answer: 1,
      },
      {
        id: 'ja-004-q3',
        question: 'メッセージカードには何と書きましたか？',
        options: ['ありがとう', 'おめでとう', '誕生日おめでとう', '元気でね'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ja-005',
    title: '病院で',
    content: `はい、どうされましたか？

ここ二、三日、頭痛が続いているんです。それに少し熱もあります。

どのくらいの熱がありますか。計りましたか？

はい、今朝計ったら三七度五分でした。

わかりました。その他の症状はありますか？咳は出ますか？せきは出ないですね。でものどが痛くて、食欲もありません。

最近、海外に行ったりしましたか？

いいえ、ずっと日本にいます。仕事が忙しくて、あまり寝ていないのかもしれません。

なるほど。睡眠不足が原因かもしれませんね。まずは診察させていただきますので、上着を脱いでください。……血圧は正常ですね。では聴診器を使います……。肺の音も問題ありません。

良かったです。風邪ですか？

軽い風邪のような症状ですね。しかし念のため血液検査もしておきましょう。結果は三十分後に出ます。

わかりました。お願いします。

（三十分後）

田中さん、検査結果が出ました。特に異常はありません。ウイルス性の軽い風邪のようです。これは処方箋です。薬局で薬をもらって、一日三回食後に服用してください。そして十分に休んでください。

ありがとうございます doctor。いつ頃良くなりますか？

薬を飲んで二、三日すれば大幅に改善するはずです。もし一週間経っても良くならなければ、また来てください。

わかりました。ありがとうございました！`,
    translation: '请问哪里不舒服？\n\n这两三天我一直头疼。还有点发烧。\n\n发烧多少度？量过了吗？\n\n量的，今天早上量的是37.5度。\n\n了解了。还有其他症状吗？咳嗽吗？\n\n不咳嗽。但是喉咙疼，也没什么食欲。\n\n最近去过国外吗？\n\n没有，一直在日本。可能是工作太忙，没怎么睡好。\n\n原来如此。可能是睡眠不足导致的。先让我检查一下，请脱掉外套。……血压正常。那我用听诊器听一下……肺部声音也没有问题。\n\n那就好。是感冒吗？\n\n看起来像是轻度感冒的症状。不过为了保险起见，我们也做个验血吧。结果30分钟后出来。\n\n好的，拜托了。\n\n（30分钟后）\n\n田中先生，检查结果出来了。没有什么异常。应该是病毒引起的轻度感冒。这是处方单。请在药房拿药，每天三次饭后服用。另外要充分休息。\n\n谢谢医生。大概什么时候能好？\n\n服药两三天应该就会大幅好转。如果一周后还没好转，请再来就诊。\n\n明白了，非常感谢！',
    difficulty: 'intermediate',
    duration: 95,
    language: 'ja',
    category: '日常对话',
    questions: [
      {
        id: 'ja-005-q1',
        question: '患者の体温は何度でしたか？',
        options: ['３６度５分', '３７度０分', '３７度５分', '３８度０分'],
        answer: 2,
      },
      {
        id: 'ja-005-q2',
        question: '医者の診断は何でしたか？',
        options: ['インフルエンザ', 'ウイルス性の軽い風邪', '細菌性の肺炎', 'アレルギー'],
        answer: 1,
      },
      {
        id: 'ja-005-q3',
        question: '薬はいつ飲みますか？',
        options: ['食前', '食後', '寝る前', ' anytime'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ja-006',
    title: 'ホテルのチェックイン',
    content: `いらっしゃいませ。グランドホテル東京でございます。ご予約はされていますか？

はい、予約しています。名前は鈴木一郎です。

鈴木様ですね。少々お待ちください……。はい、見つかりました。デブルルームで二泊のお予約ですね。チェックイン日は本日、チェックアウトは明後日でございますね。

その通りです。部屋は静かな方がいいのですが。

かしこまりました。則、高層階の奥の部屋をご用意いたします。十階の一〇一六号室です。

素晴らしい。朝食は含まれていますか？

はい、ビュッフェ式朝食が一楼レストランで毎朝七時から十時までご利用いただけます。

窓からの景色はどうですか？

一〇一六号室からは東京タワーと皇居の方角が見えます。特に夜の景色が綺麗です。

それは楽しみですね。Wi-Fiは使えますか？

はい、全客室無料Wi-Fiをご利用いただけます。パスワードはお部屋のカードキーに記載されています。

わかりました。チェックアウトの時刻は？

昼十二時です。お荷物はポーターがお部屋までお運びします。

ありがとうございます。あと、タクシーを呼ぶことはできますか？

はい、フロントで随时手配できます。必要なときにお声かけください。

いろいろありがとうございます！`,
    translation: '欢迎光临东京格兰德酒店。您有预约吗？\n\n有的，我已经预约了。我叫铃木一郎。\n\n铃木先生是吧。请稍等……好的，找到了。预约的是双人房，入住两晚。今天是入住日，后天退房对吧。\n\n对的。我希望房间安静一些。\n\n好的，那我为您准备高层靠里的房间。是10楼的1016房间。\n\n太棒了。包含早餐吗？\n\n包含的。一楼餐厅的自助早餐，每天早上7点到10点都可以使用。\n\n窗外的景色怎么样？\n\n从1016房间可以看到东京塔和皇居方向。尤其是夜景非常漂亮。\n\n真令人期待呢。可以使用Wi-Fi吗？\n\n可以，所有客房都提供免费Wi-Fi。密码写在房间的门卡上。\n\n明白了。退房时间是几点？\n\n中午12点。行李员会把行李送到房间。\n\n谢谢。另外，可以叫出租车吗？\n\n可以的，前台随时可以安排。需要的时候请告诉我们。\n\n非常感谢各项服务！',
    difficulty: 'elementary',
    duration: 80,
    language: 'ja',
    category: '日常对话',
    questions: [
      {
        id: 'ja-006-q1',
        question: '鈴木さんの部屋番号は何ですか？',
        options: ['八階の八〇五号室', '九階の九一二号室', '十階の一〇一六号室', '十一階一一〇三号室'],
        answer: 2,
      },
      {
        id: 'ja-006-q2',
        question: '朝食の時間はいつからいつまでですか？',
        options: ['六時から九時', '七時から十時', '七時半から十時半', '八時から十一時'],
        answer: 1,
      },
      {
        id: 'ja-006-q3',
        question: 'チェックアウトの時刻は何時ですか？',
        options: ['十時', '十一時', '十二時', '一时'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ja-007',
    title: '大学の授業',
    content: `皆さん、おはようございます。今日の授業は日本の伝統文化について話したいと思います。

先生、具体的にどんな内容ですか？

いい質問ですね。今日は主に三つのテーマを扱います。第一に、茶道の歴史と精神。第二に、華道の美学。第三に、武士道の現代的意義です。

茶道については、千利休という人物が重要ですよね？

その通りです。千利休は戦国時代から安土桃山時代にかけて活躍した茶人で、「わびさび」の精神を確立しました。彼の考え方は、単にお茶を立てる技術だけでなく、人生哲学としても深い影響を与えています。

「わびさび」ってどういう意味ですか？

簡単に言えば、質素の中に美しさを見出すということです。豪華な装飾ではなく、不完全さや儚さの中に価値を見いだす感性です。例えば、茶室に入ると、そこは狭くて簡素的な空間です。でも、その simplicity こそが心を落ち着かせるのです。

なるほど。とても興味深いですね。実際に茶道を体験することはできますか？

大学の近くに茶道教室があります。毎週水曜日の午後に初心者向けのクラスが開かれています。興味がある人は是非参加してみてください。

参加したいです！費用はいくらですか？

学生割引で一回五百円です。道具もすべて用意されていますから、何も持ってくる必要はありません。

では、次のテーマである華道に移りましょう…`,
    translation: '大家早上好。今天的课我想讲讲日本的传统文化。\n\n老师，具体是什么内容呢？\n\n问得好。今天主要涉及三个主题。第一，茶道的历史和精神。第二，花道的美学。第三，武士道的现代意义。\n\n关于茶道，千利休这个人物很重要吧？\n\n没错。千利休是从战国时代到安土桃山时代活跃的茶人，确立了"侘寂"的精神。他的思想不仅仅是泡茶的技艺，作为人生哲学也产生了深远影响。\n\n"侘寂"是什么意思？\n\n简单来说，就是在朴素中发现美感。不是华丽的装饰，而是在不完美和短暂之中发现价值的审美感。比如进入茶室，那里是一个狭窄而简约的空间。但正是这种简约才能让内心平静下来。\n\n原来如此，非常有意思呢。实际体验茶道可以吗？\n\n大学附近有茶道教室。每周三下午开设面向初学者的课程。有兴趣的人务必参加试试看。\n\n我想参加！费用是多少？\n\n学生折扣价每次500日元。工具也都准备好了，不需要带任何东西。\n\n那么，我们进入下一个主题——花道……',
    difficulty: 'upper-intermediate',
    duration: 130,
    language: 'ja',
    category: '故事',
    questions: [
      {
        id: 'ja-007-q1',
        question: '千利休はどんな時代に活躍しましたか？',
        options: ['平安時代', '鎌倉時代', '戦国時代から安土桃山時代', '江戸時代'],
        answer: 2,
      },
      {
        id: 'ja-007-q2',
        question: '「わびさび」の意味として正しいのはどれですか？',
        options: ['豪華な美しさ', '質素の中に美しさを見出す', '完全無欠な状態', '派手な装飾'],
        answer: 1,
      },
      {
        id: 'ja-007-q3',
        question: '茶道教室の学生割引料金はいくらですか？',
        options: ['三百円', '五百円', '八百円', '一千円'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ko-001',
    title: '카페에서',
    content: `어서 오세요. 무엇을 도와드릴까요?

안녕하세요. 아이스 아메리카노 한 잔 주세요.

네, 아이스 아메리카노 하나요. 사이즈는 어떻게 드릴까요? 라지로 해주세요.

라주 하나 나왔습니다. 주문 더 없으신가요?

음... 케이크도 하나 주세요. 어떤 케이크가 추천인가요?

오늘은 치즈케이크와 초콜릿 케이크가 방금 나왔어요. 둘 다 인기 메뉴예요.

그럼 치즈케이크로 할게요.

네, 알겠습니다. 여기 계시면서 드실건가요, 포장해 드릴까요?

여기에서 먹을게요.

테이블은 창가 쪽으로 드릴까요, 안쪽으로 드릴까요?

창가 쪽으로 부탁해요. 밖에 날씨가 좋아서요.

네, 자리를 안내해 드릴게요. 이쪽으로 오세요. 메뉴판은 테이블에 있고, 필요하시면 벨을 눌러주세요.

네, 감사합니다. 얼마예요?

아이스 아메리카노 라주 사이즈에 치즈케이크해서 모두 구천 원입니다.

(카드를 건넨다)

네, 결제 완료되었습니다. 주문하신 음식은 곧 나올 거예요. 편안한 시간 보내세요!`,
    translation: '欢迎光临。有什么可以帮您的吗？\n\n你好。请给我一杯冰美式咖啡。\n\n好的，一杯冰美式咖啡。要什么尺寸呢？\n\n请给我大杯的。\n\n一杯大杯冰美式做好了。还需要点别的吗？\n\n嗯……再来一块蛋糕吧。推荐哪款蛋糕呢？\n\n今天芝士蛋糕和巧克力蛋糕刚出炉。都是人气商品。\n\n那就要芝士蛋糕吧。\n\n好的，明白了。您是在这里吃还是打包带走？\n\n我在这里吃。\n\n座位给您安排靠窗的还是里面的？\n\n请给我靠窗的吧。外面天气不错。\n\n好的，我来引导您去座位。请往这边走。菜单在桌子上，需要的话请按铃。\n\n好的，谢谢。多少钱？\n\n冰美式大杯加芝士蛋糕，一共9000韩元。\n\n（递过卡片）\n\n好的，付款完成了。您点的餐品马上就到。祝您度过愉快的时光！',
    difficulty: 'beginner',
    duration: 60,
    language: 'ko',
    category: '日常对话',
    questions: [
      {
        id: 'ko-001-q1',
        question: '손님이 주문한 음료는 무엇입니까?',
        options: ['아이스 라떼', '핫 아메리카노', '아이스 아메리카노', '카푸치노'],
        answer: 2,
      },
      {
        id: 'ko-001-q2',
        question: '손님이 선택한 케이크는 무엇입니까?',
        options: ['초콜릿 케이크', '치즈케이크', '티라미수', '당근 케이크'],
        answer: 1,
      },
      {
        id: 'ko-001-q3',
        question: '총 금액은 얼마였습니까?',
        options: ['7,000원', '9,000원', '11,000원', '13,000원'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ko-002',
    title: '지하철 안내',
    content: `여러분, 지금부터 2호선 행선지 안내 방송입니다.

2호열차는 이번 정류장을 출발하여 내선 순환 방면으로 운행합니다. 다음 정류장은 을지로입구역입니다. 내리실 문은 왼쪽입니다.

을지로입구역에서는 1호선과 4호선으로 환승하실 수 있습니다. 1호선 환승통로는 4번 출구 방향으로, 4호선 환승통로는 2번 출구 방향으로 위치해 있습니다.

다음 정류장인 동대문역사문화공원역에서는 4호선과 5호선으로 환승 가능합니다. 특히 동대문역사문화공원역 근처에는 동대문 시장과 경희궁이 있으니 관광객 여러분께서는 참고 바랍니다.

현재 혼잡도는 보통 수준입니다. 다음 열차는 3분 후 도착 예정입니다. 노약자분들과 임산부분들께서는 좌석에 앉으시길 바라며, 서 계신 분들은 손잡이를 꼭 잡아주시기 바랍니다.

다음 정류장, 을지로입구입니다. 내리실 분들은 준비해 주십시오.

(을지로입구역 도착)

을지로입구역입니다. 문이 엽니다. 조심해서 내려주시기 바랍니다. 이 역에서 1호선과 4호선으로 환승하실 분들은 환승통로를 이용해 주십시오. 감사합니다.`,
    translation: '各位乘客，现在开始播放2号线目的地导向广播。\n\n2号线列车即将驶离本站，沿内环方向运行。下一站是乙支路入口站。下车门在左侧。\n\n在乙支路入口站可换乘1号线和4号线。1号线换乘通道位于4号出口方向，4号线换乘通道位于2号出口方向。\n\n下一站东大门历史文化公园站可换乘4号线和5号线。特别是东大门历史文化公园站附近有东大门市场和景福宫，请各位游客注意参考。\n\n当前拥挤度为一般水平。下一班列车预计3分钟后到达。请老弱病残孕乘客优先就座，站立乘客请务必握好扶手。\n\n下一站，乙支路入口。下车的乘客请做好准备。\n\n（乙支路入口站到达）\n\n乙支路入口站到了。车门开启。下车请注意安全。在本站换乘1号线和4号线的乘客请使用换乘通道。谢谢。',
    difficulty: 'intermediate',
    duration: 75,
    language: 'ko',
    category: '新闻',
    questions: [
      {
        id: 'ko-002-q1',
        question: '다음 정류장은 어디입니까?',
        options: ['동대문역사문화공원역', '을지로입구역', '서울역', '강남역'],
        answer: 1,
      },
      {
        id: 'ko-002-q2',
        question: '을지로입구역에서 몇 호선으로 환승할 수 있습니까?',
        options: ['2호선과 3호선', '1호선과 4호선', '3호선과 5호선', '6호선과 7호선'],
        answer: 1,
      },
      {
        id: 'ko-002-q3',
        question: '동대문역사문화공원역 근처에 있는 것은 무엇입니까?',
        options: ['남대문 시장과 창덕궁', '동대문 시장과 경희궁', '인사동과 북촌 한옥마을', '명동과 남산타워'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ko-003',
    title: '뉴스 리포트',
    content: `안녕하십니까, YTN 뉴스 시간입니다. 오늘의 주요 뉴스 전해 드리겠습니다.

먼저 경제 소식입니다. 한국은행이 금일 발표한 4월 물가 동향 보고서에 따르면, 소비자물가지수가 전년 동월 대비 3.1% 상승했습니다. 이는 지난 3개월 중 가장 낮은 상승률로, 에너지 가격 안정화와 농축산물 가격 하락이 주원인으로 분석됩니다. 금융 당국은 인상륑 둔화 추세가 지속된다면 기준금리 인하 가능성을 검토할 것이라고 밝혔습니다.

다음은 교육 관련 뉴스입니다. 교육부는 내년부터 전국 초중고등학교에 인공지능(AI) 교육을 정규 과목으로 편성한다고 발표했습니다. 초등학교 3학년부터 고등학교 1학년까지 매주 1시간씩 AI 기초와 윤리를 배우게 됩니다. 이번 정책은 디지털 전환 시대에 필수적인 AI 리터러시를 조기에 확보하기 위한 목적으로 추진되었습니다.

마지막으로 스포츠 소식입니다. 한국 축구 대표팀이 어제 열린 월드컵 아시아 지역 예선전에서 이란을 2대0으로 꺾고 승리를 거두었습니다. 선골은 전반 23분 손흥민의 프리킥 골과 후반 추가시간 박웅홍의 결승골로 이루어졌습니다. 이 승리로 한국팀은 조 1위를 확정 짓고 본선 진출에 한 걸음 더 다가갔습니다.

YTN 뉴스였습니다.`,
    translation: '大家好，现在是YNN新闻时间。今天的主要新闻如下。\n\n首先是经济消息。据韩国银行今天发布的4月物价动向报告显示，消费者物价指数同比上涨3.1%。这是过去三个月中的最低涨幅，主要原因是能源价格稳定和农畜产品价格下跌。金融当局表示，如果通胀放缓趋势持续，将考虑下调基准利率。\n\n接下来是教育相关新闻。教育部宣布将从明年起在全国中小学正式设置人工智能（AI）教育课程。小学三年级至高中一年级每周学习1小时AI基础知识和伦理。这项政策旨在为数字化转型时代提前确保必要的AI素养。\n\n最后是体育消息。韩国国家足球队在昨天举行的世界杯亚洲区预选赛中以2比0击败伊朗取得胜利。进球来自上半场第23分钟孙兴慜的任意球和下半场补时阶段朴雄弘的决定性进球。这场胜利使韩国队锁定小组第一名，距离晋级决赛圈又近了一步。\n\n以上是YNN新闻。',
    difficulty: 'advanced',
    duration: 100,
    language: 'ko',
    category: '新闻',
    questions: [
      {
        id: 'ko-003-q1',
        question: '4월 소비자물가지수 상승률은 몇 %였습니까?',
        options: ['2.8%', '3.1%', '3.5%', '4.0%'],
        answer: 1,
      },
      {
        id: 'ko-003-q2',
        question: 'AI 교육은 학년부터 시작됩니까?',
        options: ['초등학교 1학년', '초등학교 2학년', '초등학교 3학년', '초등학교 4학년'],
        answer: 2,
      },
      {
        id: 'ko-003-q3',
        question: '한국 축구 대표팀의 점수는 몇 대 몇이었습니까?',
        options: ['1대0', '2대0', '2대1', '3대1'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ko-004',
    title: '한국어 수업',
    content: `자, 오늘은 한국어의 존댓말에 대해 배워보겠습니다. 한국어에는 반말과 존댓말 두 가지가 있죠.

선생님, 언제 존댓말을 사용해야 하나요?

좋은 질문이에요. 기본적으로 나이가 많거나 처음 만난 사람, 그리고 직장이나 공식적인 상황에서는 존댓말을 사용합니다. 반면 친한 친구나 가족 사이에서는 반말을 쓰죠.

존댓말에도 종류가 있나요?

네, 크게 세 가지가 있습니다. 첫째, '하십시오 체' — 가장 정중한 표현이에요. "하십시오", "입니다" 같은 말들이죠. 둘째, '해요 체' — 부드럽고 친근한 존댓말이에요. "해요", "예요"를 사용해요. 셋째, '하오 체' — 옛날에는 많이 쓰였지만 요즘은 잘 안 쓰여요.

예를 들어 들 수 있을까요?

물론이죠. "밥 먹었어?"라고 하는 것이 반말이고, "밥 먹었어요?"가 해요체, "진지를 드셨습니까?"가 하십시오체예요.

와, 정말 복잡하네요! 외국인에게는 어려울 것 같아요.

처음에는 어렵게 느껴질 수 있지만, 연습하면 자연스워져요. 중요한 것은 상대방과의 관계를 파악하는 것이죠. 오늘의 과제는 친구에게는 반말로, 선생님께는 존댓말로 각각 세 문장씩 만들어 오는 거예요.

알겠습니다! 재미있을 것 같아요.`,
    translation: '那么，今天我们来学习韩国语的敬语。韩语中有非敬语和敬语两种对吧。\n\n老师，什么时候应该使用敬语呢？\n\n问得好。基本上对年纪大的或第一次见面的人，以及职场或正式场合中使用敬语。相反，亲密朋友或家人之间则使用非敬语。\n\n敬语也有种类之分吗？\n\n是的，大体分为三种。第一种，"하십시오体"——最恭敬的表达方式。如"하십시오"、"입니다"。第二种，"해요体"——柔和亲切的敬语。使用"해요"、"예요"。第三种，"하오体"——以前常用，现在不太用了。\n\n能举个例子吗？\n\n当然。"밥 먹었어?"是非敬语，"밥 먹었어요?"是해요体，"진지를 드셨습니까?"是하십시오体。\n\n哇，真的好复杂！对外国人来说好像很难。\n\n一开始可能会觉得困难，但练习之后就会自然了。重要的是把握与对方的关系。今天的作业是用非敬语给朋友写三句话，用敬语给老师写三句话。\n\n明白了！感觉会很有趣。',
    difficulty: 'elementary',
    duration: 90,
    language: 'ko',
    category: '故事',
    questions: [
      {
        id: 'ko-004-q1',
        question: '한국어 존댓말은 몇 가지 종류가 있습니까?',
        options: ['두 가지', '세 가지', '네 가지', '다섯 가지'],
        answer: 1,
      },
      {
        id: 'ko-004-q2',
        question: '"밥 먹었어요?"는 어떤 체입니까?',
        options: ['반말', '하십시오 체', '해요 체', '하오 체'],
        answer: 2,
      },
      {
        id: 'ko-004-q3',
        question: '오늘의 과제는 무엇입니까?',
        options: ['단어 50개 외우기', '짧은 글 쓰기', '반말과 존댓말로 각각 세 문장 만들기', '발표 준비하기'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ko-005',
    title: '병원 진료',
    content: '어서 오세요. 어디가 편안하지 않으세요?\n\n배가 너무 아파서 왔어요. 어제 저녁부터 계속 아프고, 오늘 아침에는 설사도 했어요.\n\n음식 잘못 드신 것 같네요. 어제 저녁에 무엇을 드셨어요?\n\n회를 먹었어요. 회센터에서 샀는데, 조금 불新鲜했을 수도 있어요.\n\n그렇군요. 식중독 증상이에요. 체온을 재볼게요... 삼십팔도 이 분이네요. 약간의 열이 있어요.\n\n심한가요?\n\n걱정 마세요. 가벼운 식중독이에요. 이 약을 드리고, 이틀 동안 미지근한 물만 드시고, 자극적인 음식은 피하세요.\n\n언제쯤 나을까요?\n\n약을 잘 드시면 내일부터는 훨씬 좋아질 거예요. 이틀 뒤에는 완전히 회복될 거예요. 그래도 목요일까지 증상이 계속되면 다시 오세요.\n\n알겠습니다. 약은 어떻게 먹나요?\n\n식후 30분에 한 알씩, 하루 세 번 드세요. 그리고 수분 섭취를 많이 하는 게 중요해요.\n\n감사합니다, 의사 선생님!\n\n더 불편한 점 있으면 언제든지 오세요. 빨리 쾌차하세요!',
    translation: '欢迎。哪里不舒服？\n\n肚子很疼来的。从昨晚开始就一直疼，今天早上还腹泻了。\n\n看来像是吃坏东西了。昨晚吃了什么？\n\n吃了生鱼片。在生鱼片中心买的，可能不太新鲜。\n\n原来是这样。这是食物中毒的症状。我来量一下体温……38.2度。有点低烧。\n\n严重吗？\n\n别担心。轻度食物中毒。给你开这些药，这两天只喝温水，避免刺激性食物。\n\n什么时候能好？\n\n好好服药的话明天起就会好很多。两天后应该完全恢复。但如果周四还有症状的话请再来。\n\n明白了。药怎么吃？\n\n饭后30分钟吃一次，一次一片，一天三次。另外多补充水分很重要。\n\n谢谢医生！\n\n有任何不适随时来就诊。早日康复！',
    difficulty: 'intermediate',
    duration: 70,
    language: 'ko',
    category: '日常对话',
    questions: [
      {
        id: 'ko-005-q1',
        question: '환자의 체온은 몇 도였습니까?',
        options: ['37.5도', '38.2도', '39.0도', '36.8도'],
        answer: 1,
      },
      {
        id: 'ko-005-q2',
        question: '진단 결과는 무엇이었습니까?',
        options: ['감기', '식중독', '위염', '맹장염'],
        answer: 1,
      },
      {
        id: 'ko-005-q3',
        question: '약은 언제 먹어야 합니까?',
        options: ['식전', '식후 30분', '취침 전', '아무 때나'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ko-006',
    title: '한국 여행 안내',
    content: `안녕하세요, 여러분! 서울 여행 정보를 안내해 드리겠습니다.

먼저 추천 명소 세 곳을 소개할게요. 경복궁은 조선时代的 왕궁으로, 화려한 건축과 아름다운 정원을 볼 수 있습니다. 특히 수문장 교대식은 꼭 보셔야 해요. 매시 정각에 열립니다.

두 번째는 남산 서울타워예요. 서울 전경을 한눈에 볼 수 있는데, 특히 야경이 정말 멋져요. 낮에는 케이블카를 타고 올라가고, 밤에는 사랑의 자물쇠를 걸어보세요.

세 번째는 인사동 거리예요. 전통 공예품, 서화, 기념품을 파는 가게들이 줄지어 있고, 전통 찻집도 많아요. 주말에는 거리 공연도 펼쳐집니다.

교편에 대해서도 말씀드릴게요. 택시는 기본요금이 4,800원이고, 지하철은 기본 1,400원부터예요. T머니 카드를 사서 사용하면 편하고 할인도 받을 수 있어요.

음식은 무엇을 추천하시나요?

비빔밥, 불고기, 김치찌개는 필수예요! 그리고 길거리 음식도 맛있어요. 떡볶이, 호떡, 어묵은 꼭 드셔 보세요.

정말 유용한 정보감사합니다!`,
    translation: '大家好！我来为大家介绍首尔旅游信息。\n\n首先介绍三个推荐景点。景福宫是朝鲜时代的王宫，可以看到华丽的建筑和美丽的庭院。特别是守门将交接仪式一定不要错过。每小时整点举行。\n\n第二个是南山首尔塔。可以一览首尔全景，夜景尤其漂亮。白天可以乘坐缆车上山，晚上可以去挂爱情锁。\n\n第三个是仁寺洞街道。传统工艺品、书画、纪念品商店林立，传统茶馆也很多。周末还有街头表演。\n\n交通方面也说一下。出租车起步价4800韩元，地铁基本票价1400韩元起。购买T-money卡使用既方便又能享受优惠。\n\n饮食方面有什么推荐的吗？\n\n拌饭、烤肉、泡菜汤是必吃的！而且街头小吃也很好吃。炒年糕、糖饼、鱼糕一定要尝尝。\n\n真是实用的信息！谢谢！',
    difficulty: 'elementary',
    duration: 85,
    language: 'ko',
    category: '故事',
    questions: [
      {
        id: 'ko-006-q1',
        question: '수문장 교대식은 언제 열립니까?',
        options: ['매시 30분', '매시 정각', '오전 10시와 오후 2시', '저녁 6시만'],
        answer: 1,
      },
      {
        id: 'ko-006-q2',
        question: '택시 기본요금은 얼마입니까?',
        options: ['3,800원', '4,800원', '5,800원', '6,800원'],
        answer: 1,
      },
      {
        id: 'ko-006-q3',
        question: '인사동에서 무엇을 살 수 있습니까?',
        options: ['전자제품', '패션 의류', '전통 공예품과 서화', '자동차 부품'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ko-007',
    title: 'TOPIK 시험 준비',
    content: `TOPIK II 시험 준비하느라 힘드시죠? 제가 팁을 몇 가지 알려드릴게요.

듣기 영역에서 가장 중요한 것은 키워드를 잡는 거예요. 한국어 뉴스나 드라마를 매일 30분 이상 들으면서, 핵심 단어를 적어보세요. 특히 접속사와 조사에 귀를 기울이세요. "그래서", "그런데", "따라서" 같은 표현이 나오면 앞뒤 문맥을 파악하는 데 큰 도움이 돼요.

읽기 영역은 시간 관리가 생명이에요. 긴 지문부터 읽지 말고, 먼저 문제를 훑어보세요. 무엇을 찾아야 하는지 알면 훨씬 빨리 답을 찾을 수 있어요. 또한 신문 기사 사설이나 에세이를 읽는 연습을 하면 도움이 됩니다.

쓰기 영역에서는 서술형 문제에 대한 틀을 미리 만들어 두세요. 예를 들어, "제 생각에는 ~ because ~ 따라서 ~" 같은 구조를 연습해 두면 실전에서 시간을 많이 아낄 수 있어요. 그리고 어휘력을 늘리는 것도 중요해요. 같은 의미를 가진 다른 표현을 여러 개 알아두세요.

마지막으로, 모의고사를 최소 5회 이상 풀어보세요. 실제 시험 환경과 비슷하게 시간을 재면서 풀어야 해요. 실수를 분석하고 약점을 보완하는 과정이 점수 향상의 핵심이에요.

모두 합격하시길 바랄게요! 화이팅!`,
    translation: '备考TOPIK II考试很辛苦吧？我来分享几个技巧。\n\n听力部分最重要的是抓住关键词。每天听30分钟以上的韩语新闻或电视剧，记录核心单词。特别注意连接词和助词。出现"그래서"、"그런데"、"따라서"这样的表达时，对理解上下文有很大帮助。\n\n阅读部分时间管理是关键。不要从头开始读长文章，先浏览题目。知道要找什么就能更快找到答案。另外练习阅读报纸社论或 essay 也很有帮助。\n\n写作部分要提前准备好论述题的框架。例如，练习"제 생각에는 ~ because ~ 따라서 ~"这样的结构可以在实战中节省很多时间。此外提高词汇量也很重要。掌握多个表达相同意思的不同说法。\n\n最后，至少要做5套以上模拟考试。要像真实考试环境一样计时做题。分析错误并弥补弱点是提分的关键。\n\n希望大家都能通过考试！加油！',
    difficulty: 'upper-intermediate',
    duration: 95,
    language: 'ko',
    category: '故事',
    questions: [
      {
        id: 'ko-007-q1',
        question: '득기 영역에서 가장 중요한 것은 무엇입니까?',
        options: ['모든 단어를 외우는 것', '키워드를 잡는 것', '속도를 빠르게 하는 것', '메모하는 것'],
        answer: 1,
      },
      {
        id: 'ko-007-q2',
        question: '읽기 영역에서 먼저 해야 할 것은 무엇입니까?',
        options: ['지문을 처음부터 끝까지 읽기', '문제를 훑어보기', '단어를 찾아보기', '시간을 재기'],
        answer: 1,
      },
      {
        id: 'ko-007-q3',
        question: '모의고사는 최소 몇 회 이상 풀어야 한다고 했습니까?',
        options: ['3회', '5회', '7회', '10회'],
        answer: 1,
      },
    ],
  },
];
