import React, { useState } from "react";

interface Item {
    id: number;
    fname: string;
    lname: string;
}

const Sample: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId !== null) {
            // Update item
            setItems(items.map(item => 
                item.id === editId ? { id: editId, fname, lname } : item
            ));
            setEditId(null);
        } else {
            // Create new item
            const newItem: Item = {
                id: Date.now(), // Use timestamp as a unique ID
                fname,
                lname,
            };
            setItems([...items, newItem]);
        }
        // Clear inputs
        setFname("");
        setLname("");
    };

    const handleEdit = (item: Item) => {
        setFname(item.fname);
        setLname(item.lname);
        setEditId(item.id);
    };

    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div>
            <h2>CRUD Operations</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        value={fname} 
                        onChange={(e) => setFname(e.target.value)} 
                        required 
                        className="border-2 ml-2 px-2 border-black"
                    />
                </div>
                <div className="mt-2">
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        value={lname} 
                        onChange={(e) => setLname(e.target.value)} 
                        required 
                        className="border-2 ml-2 px-2 border-black"
                    />
                </div>
                <button  className="bg-green-500 px-2 py-1 m-2 rounded-lg text-white"  type="submit">{editId !== null ? "Update" : "Add"}</button>
            </form>

            <h3 className="text-2xl font-bold m-5 ">Items List</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <div>
                        {item.fname} {item.lname} 
                        <button onClick={() => handleEdit(item)} className="bg-red-400  text-white p-2 ml-4">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="bg-black text-white p-2 ml-4">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sample;
