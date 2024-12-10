import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 2 as sum;");
  console.log(result.rows);
  res.status(200).json("Alunos do curso.dev são demais!");
}

export default status;
