require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

let prompt ='I am a highly intelligent question answering bot.\n\
 If you ask me a question that is rooted in truth, \n\
 I will give you the answer. If you ask me a question that is nonsense, \n\
 trickery, or has no clear answer, I will respond with "Unknown".\n\
You: What is human lgit config --global user.nameife expectancy in the United States?\n\
A: Human life expectancy in the United States is 78 years.\n\
You: Who was president of the United States in 1955?\n\
A: Dwight D. Eisenhower was president of the United States in 1955.\n\
You: Which party did he belong to?\n\
A: He belonged to the Republican Party.\n\
You: What is the square root of banana?\n\
A: Unknown\n\
You: How does a telescope work?\n\
A: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\
You: Where were the 1992 Olympics held?\n\
A: The 1992 Olympics were held in Barcelona, Spain.\n';

client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    prompt += `You: ${message.content}\n`;
    (async () => {
        const gptResponse = await openai.complete({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0,
            top_p: 1,
            presence_penalty: 0,
            frequency_penalty: 0,
            
        });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
});

client.login(process.env.BOT_TOKEN);