import { Sequelize } from "sequelize";

const sequelize = new Sequelize("indiflavournest", "root", "my_sql@123#45$", 
    {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .sync()
  .then((result) => {
    console.log("Database connected....");
  })
  .catch((err) => {
    console.log(err);
  });
export default sequelize;
