import Fastify from "fastify";
import { IQuerystring, IReply } from "./data.js";

const fastify = Fastify({
  logger: true,
});

fastify.listen({ port: 3010 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

fastify.get<{
  Querystring: IQuerystring;
  Reply: IReply;
}>("/getFibonacciValue", function (request, reply) {
  reply.header("Access-Control-Allow-Origin", "*");

  const position = parseInt(request.query.position);

  const error = validateInputAndGetError(position);
  if (error !== undefined) {
    reply.code(400).send({ error: error });
  }

  const value = calculateFibonacciValueByPosition(position);

  reply.code(200).send({ resultValue: value });
});

function validateInputAndGetError(position: number): string | undefined {
  console.log("position", position);

  if (isNaN(position)) return "The input value is not valid.";

  if (position < 0)
    return "The input value must be an integer (e.g. 0, 6, 14, ...).";

  return undefined;
}

function calculateFibonacciValueByPosition(position: number): number {
  if (position === 0) return 0;
  if (position === 1) return 1;

  return Array.from({ length: position - 1 }, (_) => []).reduce(
    ([previous, current], _) => [current, previous + current],
    [0, 1]
  )[1];
}
