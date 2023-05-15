import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import prompt from 'prompt';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const obtenerPregunta = () => {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.message = '';
    prompt.get(['message'], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result.message);
      }
    });
  });
};

const obtenerRespuesta =   await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    prompt: pregunta,
    maxTokens: 100
  });

;

async function main() {
  try {
    const pregunta = await obtenerPregunta();
    const respuesta = await obtenerRespuesta(pregunta);
    console.log(respuesta);
  } catch (error) {
    console.error(error);
  }
}

main();
