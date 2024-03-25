const Blog = require("../models/Blog");
// const User = require("../models/User");
const deleteFile = require("../helpers/deleteFile");

exports.createBlog = (req, res, next) => {
  // const { userID } = req.params;
  const { header, description } = req.body;

  if (!req.files.blog_image) {
    return res.status(401).json({
      success: false,
      message: "No image selected",
    });
  }
  const blog_image = req.files.blog_image[0];

  // User.findOne({
  //   where: {
  //     id: userID,
  //   },
  // }).then((data) => {
  //   if (!data) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "User does not exist",
  //     });
  //   }
  Blog.create({
    user_id: userID,
    header,
    description,
    blog_image: blog_image.filename || null,
    blog_image_url: `public/assets/blog-upload/${blog_image.filename}`,
  })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Blog created",
      });
    })
    .catch((err) => {
      next(err);
    });
  // });
};

exports.updateBlog = (req, res, next) => {
  const { blogID } = req.params;
  const { header, description } = req.body;

  Blog.findOne({
    where: {
      id: blogID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Blog not found",
        });
      }
      if (data.blog_image) {
        deleteFile(data.blog_image, "blog-upload");
      }

      data.header = header;
      data.description = description;

      //Optional for blog image
      if (req.files && req.file.blog_image) {
        const newBlogImage = req.files.blog_image[0];
        newBlogImage.mv(
          `public/assets/blog-upload/${newBlogImage.filename}`,
          (err) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message: "Failed to upload image",
              });
            }
          }
        );
      }
      data.blog_image = newBlogImage.filename;
      data.blog_image_url = `public/assets/blog-upload/${newBlogImage.filename}`;
      //

      data.save();
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
      });
    });
};

exports.deleteBlog = (req, res, next) => {
  const { blogID } = req.params;

  Blog.findOne({
    where: {
      id: BlogID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Blog not found",
        });
      }
      const blogImage = data.blog_image;
      const blogImageUrl = data.blog_image_url;

      deleteFile(blogImage, "blog-upload");
      return Blog.destroy({
        where: {
          id: blogID,
        },
      });
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Blog successfully deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.findBlogbyID = (req, res, next) => {
  const { blogID } = req.params;

  Blog.findOne({
    where: {
      id: blogID,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: true,
          message: "No blog found",
        });
      }

      const blogInfo = data.map((content) => ({
        id: content.blogID,
        // user_id: content.user_id,
        header: content.header,
        description: content.description,
        blog_image: content.blog_image,
        blog_image_url: content.blog_image_url,
      }));
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Blog found",
        blogInfo,
      });
    });
};

// exports.findBlogbyUserID = (req, res, next) => {
//   const { userID } = req.params;

//   Blog.findOne({
//     where: {
//       user_id: userID,
//     },
//   })
//     .then((data) => {
//       if (!data) {
//         return res.status(400).json({
//           success: true,
//           message: "No blog found",
//         });
//       }

//       const blogInfo = data.map((content) => ({
//         id: content.blogID,
//         user_id: content.user_id,
//         header: content.header,
//         description: content.description,
//         blog_image: content.blog_image,
//         blog_image_url: content.blog_image_url,
//       }));
//       return res.status(200).json({
//         success: true,
//         message: "Blog found",
//         blogInfo,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

exports.findAllBlog = (req, res, next) => {
  Blog.findAll()
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          success: true,
          message: "Error",
        });
      }
      if (data.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No blog found",
        });
      }

      const blogInfo = data.map((content) => ({
        id: content.blogID,
        // user_id: content.user_id,
        header: content.header,
        description: content.description,
        blog_image: content.blog_image,
        blog_image_url: content.blog_image_url,
      }));
      return res.status(200).json({
        success: true,
        message: "Blog found",
        blogInfo,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// exports.findAllBlogbyUserID = (req, res, next) => {
//   const { userID } = req.params;
//   Blog.findAll({
//     where: {
//       user_id: userID,
//     },
//   })
//     .then((data) => {
//       if (!data) {
//         return res.status(400).json({
//           success: true,
//           message: "Error",
//         });
//       }
//       if (data.length === 0) {
//         return res.status(200).json({
//           success: true,
//           message: "No blog found",
//         });
//       }

//       const blogInfo = data.map((content) => ({
//         id: content.blogID,
//         user_id: content.user_id,
//         header: content.header,
//         description: content.description,
//         blog_image: content.blog_image,
//         blog_image_url: content.blog_image_url,
//       }));
//       return res.status(200).json({
//         success: true,
//         message: "Blog found",
//         blogInfo,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };
