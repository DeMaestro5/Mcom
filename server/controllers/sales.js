import Overallstats from '../models/OverallStats.js';

export const getSales = async (req, res) => {
  try {
    const overallStats = await Overallstats.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
