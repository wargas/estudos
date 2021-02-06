const PageTitle = ({ title = "", subtitle = "", actions = null }) => {
    return (
        <header className="content__title pt-0 px-0">
            <h1>{title}</h1>
            {subtitle !== "" && <small>{subtitle}</small>}

            {actions && (
                <div className="actions">
                    {actions}
                </div>
            )}
        </header>
    )
}

export default PageTitle;