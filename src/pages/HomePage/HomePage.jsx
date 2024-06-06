import css from './HomePage.module.css'

export default function HomePage() {
    return (
        <div className={css.container}>
            <h1>
                Welcome to the Contacts App
            </h1>
            <p>Manage your contacts easily and securely</p>
        </div>
    );
}