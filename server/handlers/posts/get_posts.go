package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostsResponse struct {
	Message string                       `json:"message"`
	Posts   []models.PostResponseContent `json:"posts"`
}

func GetPosts(c *fiber.Ctx) error {
	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	if limit > 30 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Limit must be less than 30.",
		})
	}

	posts, err := models.GetPosts(int64(limit), int64(offset), nil, bson.M{"created_at": -1})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching posts.",
		})
	}

	var authorIDs []primitive.ObjectID
	for _, post := range posts {
		authorIDs = append(authorIDs, post.Author)
	}

	authorMap := make(map[primitive.ObjectID]models.User)
	for _, authorID := range authorIDs {
		author, err := models.GetUserByID(authorID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching post authors.",
			})
		}
		authorMap[author.ID] = author
	}

	var responsePosts []models.PostResponseContent
	for _, post := range posts {
		author := authorMap[post.Author]

		responsePosts = append(responsePosts, models.PostResponseContent{
			ID:        post.ID,
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
			Author: models.PostResponseAuthor{
				ID:          author.ID,
				CreatedAt:   author.CreatedAt,
				DisplayName: author.DisplayName,
				Role:        author.Role,
				Username:    author.Username,
				About:       author.About,
				Points:      author.Points,
			},
			Content:  post.Content,
			Likes:    post.Likes,
			Comments: post.Comments,
		})
	}

	return c.Status(fiber.StatusOK).JSON(PostsResponse{
		Message: "Posts found.",
		Posts:   responsePosts,
	})
}
