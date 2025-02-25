import React, { createContext, useContext, useState } from 'react';

const RewardContext = createContext();

export const useRewardContext = () => {
    const context = useContext(RewardContext);
    if (!context) {
        throw new Error('useRewardContext must be used within a RewardProvider');
    }
    return context;
};

export const RewardProvider = ({ children }) => {
    const [coupons, setCoupons] = useState(0);
    const [rewardHistory, setRewardHistory] = useState([]);

    const addCoupons = (amount) => {
        setCoupons(prev => prev + amount);
    };

    const redeemCoupons = () => {
        if (coupons > 0) {
            const moneyValue = Math.floor(coupons / 5); // 5 coupons = ₹1
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

            setRewardHistory(prev => [...prev, {
                id: Date.now(),
                amount: `₹${moneyValue}`,
                couponsRedeemed: coupons,
                redeemedAt: currentDate,
                status: "Redeemed"
            }]);

            setCoupons(0); // Reset coupons after redemption
        }
    };

    const value = {
        coupons,
        addCoupons,
        redeemCoupons,
        rewardHistory,
        moneyEquivalent: Math.floor(coupons / 5) // 5 coupons = ₹1
    };

    return (
        <RewardContext.Provider value={value}>
            {children}
        </RewardContext.Provider>
    );
};