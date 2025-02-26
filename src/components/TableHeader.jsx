const TableHeader = () => {
    const headers = ["Summary", "Status", "Assignee", "Category"];
  
    return (
      <div className="grid grid-cols-4 gap-4 bg-gray-100 px-4 py-2 rounded-md text-gray-600 font-semibold text-sm">
        {headers.map((header) => (
          <div key={header}>{header}</div>
        ))}
      </div>
    );
  };
  
  export default TableHeader;
  