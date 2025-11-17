import { Request, Response, NextFunction } from "express";
import userService from "../service/user.service.js";

const userController = {

	list: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const data = await userService.userList();
			res.status(200).json({
				message: 'User List fetch successfully',
				data
			})
		} catch (error) {
			next(error);
		}
	},

	getUser: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const data = await userService.findUserById(id);

			if (!data) {
				return res.status(404).json({
					message: 'User not found',
				})
			}

			res.status(200).json({
				message: 'User Details.',
				data
			})
		} catch (error) {
			next(error)
		}
	},

	register: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newData = req.body;

			const existingUser = await userService.findUserByEmail(newData.email);
			if (existingUser) {
				return res.status(409).json({
					message: `User already exit with this ${newData.email}`,
				});
			}

			const user = await userService.userRegiter(newData);
			res.status(201).json({
				message: 'User create successfully.',
				data: {
					id: user._id,
					name: user.name,
					email: user.email
				}

			})
		} catch (error) {
			next(error);
		}
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;

			if (!email && !password) {
				return res.status(400).json({
					message: 'Email and Password are required.'
				})
			}

			const result = await userService.userLogin(email, password);

			if (!result) {
				return res.status(401).json({
					message: 'Invalid Email and Password '
				})
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
			const newData = req.body;
			const data = await userService.userUpdate(id, newData);

			if (!data) {
				return res.status(404).json({
					message: 'User not found',
				})
			}

			res.status(200).json({
				message: 'User update successfully.'
			})
		} catch (error) {
			next(error);
		}
	},

	delete: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const data = await userService.userDelete(id);

			if (!data) {
				return res.status(404).json({
					message: 'User not found',
				})
			}

			res.status(200).json({
				message: 'User delete successfully.'
			})
		} catch (error) {
			next(error);
		}
	},

	uploadProfileImage: async (req: Request, res: Response, next: NextFunction) => {
		const file = req.file;
		if (!file) {
			return res.status(400).json({
				message: 'No file uploaded.',
			})
		}

		res.status(200).json({
			message: 'Profile image uploaded successfully.',
			file: file,
			url: `/uploads/users/${file.filename}`
		})
	}

}

export default userController