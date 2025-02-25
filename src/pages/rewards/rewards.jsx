import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Coins, Gift, History, ArrowRight } from 'lucide-react';

export const Rewards = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Stop confetti after 5 seconds
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    const rewardHistory = [
        {
            id: 1,
            couponCode: "COFFEE50",
            amount: "₹50",
            redeemedAt: "2024-03-14 15:30:00",
            status: "Redeemed"
        },
        {
            id: 2,
            couponCode: "LUNCH100",
            amount: "₹100",
            redeemedAt: "2024-03-14 13:45:00",
            status: "Redeemed"
        },
        {
            id: 3,
            couponCode: "SNACK25",
            amount: "₹25",
            redeemedAt: "2024-03-14 11:20:00",
            status: "Redeemed"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={200}
                    recycle={false}
                />
            )}

            <div className="max-w-4xl mx-auto">
                {/* Rewards Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center mb-4">
                            <Gift className="w-8 h-8 mr-3" />
                            <h3 className="text-2xl font-bold">Available Coupons</h3>
                        </div>
                        <p className="text-4xl font-bold mb-2">150</p>
                        <p className="text-orange-100">Active reward coupons</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center mb-4">
                            <Coins className="w-8 h-8 mr-3" />
                            <h3 className="text-2xl font-bold">Equivalent Money</h3>
                        </div>
                        <p className="text-4xl font-bold mb-2">₹30</p>
                        <p className="text-purple-100">Total value of rewards</p>
                    </div>
                </div>

                {/* Redeem Button */}
                <div className="text-center mb-12">
                    <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg">
                        Redeem Rewards
                    </button>
                </div>

                {/* History Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center mb-6">
                        <History className="w-6 h-6 mr-2 text-gray-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Redemption History</h2>
                    </div>

                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coupon Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redeemed At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rewardHistory.map((reward) => (
                                    <tr key={reward.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reward.couponCode}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reward.redeemedAt}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {reward.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;