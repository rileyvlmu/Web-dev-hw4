// favoritesService.js
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

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

