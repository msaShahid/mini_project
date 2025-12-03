import { Request, Response, NextFunction } from "express";
import userService from "../service/user.service.js";

const userController = {

	list: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await userService.userList();
			res.status(200).json({
				success: true,
				message: "User list fetched successfully",
				data: users
			})
		} catch (error) {
			next(error);
		}
	},

	getUser: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const user = await userService.findUserById(id);

			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			res.status(200).json({
				success: true,
				message: "User details fetched successfully",
				data: user,
			});
		} catch (error) {
			next(error)
		}
	},

	register: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;

			// Checking duplicate email 
			const existingUser = await userService.findUserByEmail(data.email);
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: `User already exists with email ${data.email}`,
				});
			}

			const user = await userService.userRegister(data);
			res.status(201).json({
				success: true,
				message: "User created successfully",
				data: {
					id: user._id,
					name: user.name,
					email: user.email,
				},
			});
		} catch (error) {
			next(error);
		}
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({
					success: false,
					message: "Email and password are required",
				});
			}

			const result = await userService.userLogin(email, password);
			if (!result) {
				return res.status(401).json({
					success: false,
					message: "Invalid email or password",
				});
			}

			return res.status(200).json({
				success: true,
				message: 'User logged in successfully',
				data: {
					_id: result.user.id,
					name: result.user.name,
					email: result.user.email,
					token: result.token
				}
			});

		} catch (error) {
			next(error);
		}
	},

	update: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const updated = await userService.userUpdate(id, body);

			if (!updated) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			res.status(200).json({
				success: true,
				message: 'User update successfully.'
			})
		} catch (error) {
			next(error);
		}
	},

	delete: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const deleted = await userService.userDelete(id);

			if (!deleted) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	},

	uploadProfileImage: async (req: Request, res: Response, next: NextFunction) => {
		const file = req.file;
		if (!file) {
			return res.status(400).json({
				success: false,
				message: "No file uploaded",
			});
		}

		res.status(200).json({
			success: true,
			message: "Profile image uploaded successfully",
			file: file,
			url: `/uploads/users/${file.filename}`
		})
	}

}

export default userController