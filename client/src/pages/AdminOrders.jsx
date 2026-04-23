import { useEffect, useState } from 'react';
import API from '../api/axios'; 
import { Package, Clock, CheckCircle, User, Truck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      // Sorting orders: Newest first
      setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeliver = async (id) => {
    console.log("BUTTON CLICKED! Order ID:", id);
    
    if (window.confirm("Mark as Delivered?")) {
      try {
        await API.put(`/orders/${id}/deliver`);
        toast.success("Order Updated!");
        fetchOrders();
      } catch (error) {
        console.error("AXIOS ERROR:", error);
        toast.error("ERROR: " + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mb-4"></div>
      <p className="tracking-widest uppercase text-xs">Syncing with Server...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Manage Orders</h1>
        <div className="bg-accent/10 px-4 py-2 rounded-lg border border-accent/20">
          <span className="text-accent font-bold">{orders.length}</span> 
          <span className="text-gray-400 text-sm ml-2">Total Orders</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-dark-800 rounded-2xl border border-dark-700 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-dark-900/50 text-gray-400 text-[10px] uppercase tracking-widest border-b border-dark-700">
              <th className="p-5 font-semibold">Order ID</th>
              <th className="p-5 font-semibold">Customer & Items</th>
              <th className="p-5 font-semibold">Shipping Address</th>
              <th className="p-5 font-semibold">Total</th>
              <th className="p-5 font-semibold">Status</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-dark-700/30 transition-colors group">
                <td className="p-5 text-[10px] font-mono text-gray-500 group-hover:text-accent">
                  #{order._id.substring(0, 10).toUpperCase()}
                </td>
                
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-dark-700 flex items-center justify-center">
                        <User size={14} className="text-gray-400" />
                      </div>
                      <span className="text-gray-200 font-medium text-sm">
                        {order.user?.name || 'Unknown User'}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="text-[11px] flex items-center gap-2 text-gray-400 bg-dark-900/80 px-2 py-1 rounded border border-dark-700">
                          <img src={item.image} alt="" className="w-4 h-4 object-cover rounded-sm" />
                          <span className="text-accent font-bold">{item.qty}x</span>
                          <span className="truncate max-w-[150px]">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Shipping Address Column */}
                <td className="p-5">
                  <div className="flex flex-col gap-1 text-[10px] text-gray-400 max-w-[220px]">
                    <div className="flex items-start gap-1.5">
                      <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                      <span>
                        {order?.shippingAddress?.address ? (
                          <>
                            <span className="text-gray-200 block leading-tight mb-1">
                                {order.shippingAddress.address}
                            </span>
                            <span className="text-gray-500">
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                            </span>
                          </>
                        ) : (
                          <span className="italic text-gray-600 text-[14px]">Address info not found</span>
                        )}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-white font-bold text-sm">
                  ${order.totalPrice.toFixed(2)}
                </td>

                <td className="p-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border transition-all duration-500 ${
                    order.status === 'Delivered' 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' 
                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]'
                  }`}>
                    {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {order.status || 'Pending'}
                  </span>
                </td>

                <td className="p-5 text-right">
                  {order.status !== 'Delivered' ? (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeliver(order._id)} 
                      className="inline-flex items-center gap-1.5 text-[10px] bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition-all font-bold shadow-lg"
                    >
                      <Truck size={14} />
                      MARK DELIVERED
                    </motion.button>
                  ) : (
                    <span className="text-green-500/50 text-[10px] font-bold italic flex items-center justify-end gap-1 px-4 py-2">
                      <CheckCircle size={14} /> Processed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">No customer orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;