import Link from 'next/link';

const Header = () => {
    return (
        <header className="header">
            <div className="navigation-trigger">
                <div class="navigation-trigger__inner">
                    <i class="navigation-trigger__line"></i>
                    <i class="navigation-trigger__line"></i>
                    <i class="navigation-trigger__line"></i>
                </div>
            </div>
            <div className="header__logo">
                <h1>
                    <Link href="/">
                        <a>ESTUDOS</a>
                    </Link>
                </h1>
            </div>
            <div className="header__links" style={{
                marginLeft: "auto"
            }}>
                <Link href="/disciplinas">
                    <a style={{fontWeight: "bold", color: "white"}} >DISCIPLINAS</a>
                </Link>
            </div>
        </header>
    )
}

export default Header;