package posts

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RemoveReqBody struct {
	PostID string `json:"post_id"`
}

func RemovePost(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	body := &RemoveReqBody{}
	if c.Bind(body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request body."})
		return
	}

	if body.PostID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	postID, err := primitive.ObjectIDFromHex(body.PostID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID."})
		return
	}

	post, err := models.GetPostByID(postID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching post."})
		return
	}

	if post.AuthorID.Hex() != user.(models.User).ID.Hex() {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized."})
		return
	}

	if err := models.DeletePost(postID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error deleting post."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Post deleted."})
}
