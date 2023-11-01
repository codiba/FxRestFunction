const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));

// GET /offer - Tüm teklifleri döndür
app.get('/offer', async (req, res) => {
    res.json([{ id: 1, offer: {} }, { id: 2, offer: {} }]);
});

// POST /offer - Yeni bir teklif oluştur
app.post('/offer', async (req, res) => {
    const offer = req.body;
    const docRef = db.collection('offers').doc();
    await docRef.set(offer);
    res.status(201).send('Offer created successfully!');
});

// DELETE /offer/{id} - Belirli bir teklifi sil
app.delete('/offer/:id', async (req, res) => {
    const { id } = req.params;
    const docRef = db.collection('offers').doc(id);
    await docRef.delete();
    res.send('Offer deleted successfully!');
});

// PATCH /offer/{id} - Belirli bir teklifi güncelle
app.patch('/offer/:id', async (req, res) => {
    const { id } = req.params;
    const updatedOffer = req.body;
    const docRef = db.collection('offers').doc(id);
    await docRef.update(updatedOffer);
    res.send('Offer updated successfully!');
});

exports.OfferRest = functions.https.onRequest(app);
