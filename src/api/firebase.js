import { initializeApp } from "firebase/app";
import { v4 as uuid } from 'uuid';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged  
} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

/**
 * 로그인
 */
export function login() {
    signInWithPopup(auth, provider)
        .catch(console.error);
}

/**
 * 로그아웃
 */
export function logout() {
    signOut(auth).catch(console.error);
}

/**
 * user 정보 변경시에만 호출
 */
export async function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    })
}

/**
 * admin user인지 체크
 */
async function adminUser(user) {
    return get(ref(database, 'admins'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid);

                return {...user, isAdmin}
            }

            return user;
        })
}

/**
 * 제품 등록
 */
export async function addNewProduct(product, imageUrl) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image: imageUrl,
        options: product.options?.split(',') ?? []
    })
}

/**
 * 상품 가져오기
 */
export async function getProducts() {
    return get(ref(database, 'products'))
        .then(snapshot => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val())
            }
            
            return [];
        })
}