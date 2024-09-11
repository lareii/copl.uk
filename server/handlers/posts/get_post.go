package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostResponse struct {
	Message string      `json:"message"`
	Post    PostDetails `json:"post"`
}

type PostDetails struct {
	ID        primitive.ObjectID   `json:"id"`
	CreatedAt primitive.Timestamp  `json:"created_at"`
	UpdatedAt primitive.Timestamp  `json:"updated_at"`
	Author    AuthorDetails        `json:"author"`
	Content   string               `json:"content"`
	Likes     []primitive.ObjectID `json:"likes"`
	Comments  uint                 `json:"comments"`
}

type AuthorDetails struct {
	ID          primitive.ObjectID  `json:"id"`
	CreatedAt   primitive.Timestamp `json:"created_at"`
	DisplayName string              `json:"display_name"`
	Username    string              `json:"username"`
	About       string              `json:"about,omitempty"`
	Points      int                 `json:"points"`
}

func GetPost(c *fiber.Ctx) error {
	id := c.Params("id")
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID.",
		})
	}

	post, err := models.GetPostByID(postID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching post.",
		})
	}

	author, err := models.GetUserByID(post.Author)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching post author.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(PostResponse{
		Message: "Post found.",
		Post: PostDetails{
			ID:        post.ID,
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
			Author: AuthorDetails{
				ID:          author.ID,
				CreatedAt:   author.CreatedAt,
				DisplayName: author.DisplayName,
				Username:    author.Username,
				About:       author.About,
				Points:      author.Points,
			},
			Content:  post.Content,
			Likes:    post.Likes,
			Comments: post.Comments,
		},
	})
}
