import Header from "./header";

const Layout = ({ children }) => {
    return (
        <main className="main">
            <Header />
            <section style={{height: '100vh', overflowY: 'auto'}} className="content content--full">
                {children}
            </section>
        </main>
    )
}

export default Layout;