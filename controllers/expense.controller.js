import Expense from "../models/expense.models.js";

// Add an expense
export const addExpense = async (req, res) => {
  const { title, amount, category } = req.body;

  try {
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses for a user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};