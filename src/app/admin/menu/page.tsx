"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

type MenuItem = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: string;
  image: string;
  isAvailable: boolean;
};

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/admin/menu");
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setValue("name", item.name);
      setValue("slug", item.slug);
      setValue("category", item.category);
      setValue("description", item.description);
      setValue("price", item.price);
      setValue("image", item.image);
      setValue("isAvailable", item.isAvailable);
    } else {
      setEditingItem(null);
      reset({
        name: "",
        slug: "",
        category: "COFFEE",
        description: "",
        price: "",
        image: "",
        isAvailable: true,
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    data.price = parseFloat(data.price);
    
    try {
      const url = editingItem ? `/api/admin/menu/${editingItem.id}` : "/api/admin/menu";
      const method = editingItem ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchMenu();
      } else {
        alert("Failed to save menu item");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAvailability = async (id: string, isAvailable: boolean) => {
    try {
      const res = await fetch(`/api/admin/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !isAvailable }),
      });
      if (res.ok) fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/menu/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading menu items...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-foreground">Menu Management</h1>
          <p className="text-muted text-sm mt-1">Add, edit, or remove items from the public menu.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface text-muted text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted max-w-[200px] truncate">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 font-medium">${item.price}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAvailability(item.id, item.isAvailable)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.isAvailable ? 'bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600' : 'bg-surface-muted text-muted hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      {item.isAvailable ? <><Eye size={14} /> Available</> : <><EyeOff size={14} /> Hidden</>}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openModal(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {menuItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">No menu items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-display font-medium mb-6">
              {editingItem ? "Edit Menu Item" : "Add Menu Item"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <input {...register("name")} required className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Slug</label>
                  <input {...register("slug")} required className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Category</label>
                  <select {...register("category")} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm">
                    <option value="COFFEE">Coffee</option>
                    <option value="MATCHA">Matcha</option>
                    <option value="TEA">Tea</option>
                    <option value="DESSERT">Dessert</option>
                    <option value="PASTRY">Pastry</option>
                    <option value="SIGNATURE">Signature</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Price</label>
                  <input type="number" step="0.01" {...register("price")} required className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Image URL</label>
                <input {...register("image")} required className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <textarea {...register("description")} required rows={3} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm resize-none"></textarea>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="isAvailable" {...register("isAvailable")} />
                <label htmlFor="isAvailable" className="text-sm">Available to public</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
