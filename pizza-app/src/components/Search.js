function Search ({ searchTerm, onSearchChange }) {
    return(
        <div className="searchbar">
            <label htmlFor="search"> Search Restaurant:</label>
            <input
            type="text"
            id="search"
            placeholder="Type a name to search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            />

            <label htmlFor="search"> Search Pizza:</label>
            <input
            type="text"
            id="search"
            placeholder="Type a name to search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            />

        </div>
    )
}