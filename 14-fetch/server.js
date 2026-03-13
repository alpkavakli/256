import express from "express";
const app = express();

app.get("/", async (req, res) => {
  //async dedik ki await kullanabilelim js engine bilsin
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    }));
    res.send(`
            <h1>Users</h1>
            <ul>
             ${users
               .map(
                 (u) => `
                    <li>
                        <a href="">${u.id}/posts</a> şunu bi düzelt
                        ( ${u.email})  
                    </li>
                `
               )
               .join("")}
             </ul>
        `);
    //fonk değil de obje kabul etsin diye parantezle çevreledik
  } catch (error) {
    res.status(500).send("erormeror");
  }



  app.get("/users/:id/posts", async (req, res) => {
    const id = req.params.id
    const response = await fetch("https://dummyjson.com/users" + id + "/posts")
    const data = await response.json() //verileri okudu convert etti ve içine koydu
    res.send(`
        <h1>Posts for userID: ${id}</h1>
        <ul>
            ${
                data.posts.map( p=> `<li>${p.title} (${p.views})</li>`)
                    .join("")
            }
        </ul>
    `)
  })
  /* console.log(data.users) */ //readeblestream diye bişi var onu okuyarak diğer http paketlerini oku
});

app.listen(3000);
