auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('comments').onSnapshot(snapshot => {
            setupComments(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message)
        });
    } else {
        setupUI();
        setupComments([]);
    }
});

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Refresh the page

    db.collection('comments').add({
        title: createForm['title'].value, // title: createForm.title.value
        content: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.messenge);
    });
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user log out');
    });
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);

        const modal = document.querySelector('modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});