// favoritesService.js
import { db } from '../firebaseConfig';
import { collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

export async function saveToFavorites(userId, recipeId) {
  try {
    await addDoc(collection(db, 'favorites'), {
      userId,
      recipeId
    });
    console.log(`Recipe ID ${recipeId} saved to favorites for user ${userId}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function removeFromFavorites(userId, recipeId) {
  try {
    const q = query(collection(db, 'favorites'), where('userId', '==', userId), where('recipeId', '==', recipeId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log(`Recipe ID ${recipeId} removed from favorites for user ${userId}`);
  } catch (e) {
    console.error("Error removing document: ", e);
  }
}
