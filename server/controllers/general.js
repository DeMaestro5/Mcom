import User from '../models/User.js';
import OverallStats from '../models/OverallStats.js';
import Transaction from '../models/Transaction.js';

export const getUser = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    res.status(404).json({ message: 'User not Found' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    // recent Transactions
    const transactions = await Transaction.find({ userId: req.userId })
      .limit(50)
      .sort({ createdOn: -1 });

    // overall stat

    const overallStat = await OverallStats.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: 'User not Found' });
  }
};
