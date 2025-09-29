// import { Hono } from 'hono';
// import { commentController } from '../controllers/comment-controller';
// import { authMiddleware } from '../middlewares/auth-middleware';

// const commentRoutes = new Hono();

// commentRoutes.use('*', authMiddleware);

// commentRoutes.get('/:postId', commentController.getCommentsByPost);
// commentRoutes.post('/:postId', commentController.createComment);
// commentRoutes.get('/:postId/:commentId', commentController.getCommentById);
// commentRoutes.put('/:postId/:commentId', commentController.updateComment);
// commentRoutes.delete('/:postId/:commentId', commentController.deleteComment);

// export default commentRoutes;
