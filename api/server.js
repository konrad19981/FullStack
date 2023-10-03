const express = require('express');
const methodOverride = require('method-override');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
module.exports = app;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.redirect('/read');
});
app.post('/tasks', async (req, res) => {
    try {
        // Sprawdź, czy wszystkie wymagane pola są zdefiniowane
        if (
            typeof req.body.content !== 'string' ||
            (req.body.done !== 'true' && req.body.done !== 'false')
        ) {
            return res.status(400).send('Nieprawidłowe dane zadania.');
        }
        const done = req.body.done === 'true';
        const content = req.body.content || 'In Progress';
        const zadanieJson = {
            content,
            done
        };
        const docRef = await db.collection("Zadanie").add(zadanieJson);
        res.redirect('/read');
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.post('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('ID do usunięcia:', id);
        await db.collection("Zadanie").doc(id).delete();
        res.redirect('/read');
    } catch (error) {
        console.error('Błąd podczas usuwania zadania:', error);
        res.status(500).send(error.message);
    }
});
app.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newContent = req.body.newContent;
        const newDone = req.body.newDone === 'true';
        const taskRef = db.collection("Zadanie").doc(id);
        await taskRef.update({
            content: newContent,
            done: newDone
        });
        res.redirect('/read');
    } catch (error) {
        console.error('Błąd podczas aktualizacji zadania:', error);
        res.status(500).send(error.message);
    }
});
app.get('/read', async (req, res) => {
    try {
        const zadaniaRef = db.collection("Zadanie");
        const snapshot = await zadaniaRef.get();
        const zadania = [];
        snapshot.forEach((doc) => {
            const zadanie = doc.data();
            zadania.push({
                id: doc.id,
                content: zadanie.content,
                done: zadanie.done
            });
        });
        res.render('contacts', { zadania });
    } catch (error) {
        console.error('Błąd podczas pobierania zadań:', error);
        res.status(500).send(error.message);
    }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);

});