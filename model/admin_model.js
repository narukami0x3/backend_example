const {pool} = require('./conn')

async function getusers() {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query('SELECT * FROM users WHERE role = 2')
        return row || null
    } finally {
        conn.release();
    }
}

async function rmuser(id) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query('DELETE FROM users WHERE user_id = ?',[id])
        return row.affectedRows || null
    } finally {
        conn.release()
    }
}

async function edituser(id,username,fname,lname,phone,address) {
    let conn = await pool.getConnection()
    try{
        const [row] = await conn.query('UPDATE users SET username = ? , fname = ? , lname = ? , phone = ? , address = ? WHERE user_id = ?',
        [username,fname,lname,phone,address,id]
        )
        console.log(row)
        return row.affectedRows || null
    }finally{
        conn.release()
    }
}

module.exports = {
    getusers,
    rmuser,
    edituser
}