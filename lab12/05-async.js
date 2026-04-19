    import express from 'express';
    const app = express();
    app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/users'); 
        const json = await response.json();
        const users = json.users.map(user => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`, 
                    email: user.email
            }));
            res.send(`
                    <h1>Users</h1>
                    <ul>
                        ${users.map(user => `
                            <li>
                                <a href="/users/${user.id}/posts">${user.name}</a> 
                            (${user.email})</li>`
                            ).join('')
                        } 
                    </ul>
            `);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }    
    });

    app.get('/users/:id/posts', async (req, res) => {
        const userId = req.params.id;   
        try {
            const response = await fetch(`https://dummyjson.com/users/${userId}/posts`);
            const json = await response.json();
            res.send(`
                    <h1>Posts for User ID: ${userId}</h1>
                    <ul>
                        ${json.posts.map(post => `<li>${post.title}</li>`).join('')}
                    </ul>
                    <a href="/">Back to Users</a>   
            `);
        } catch (error) {
            res.status(500).send('Error fetching posts');
        }   
    });

    app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    });