package posts

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeletePost(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	id := c.Param("id")
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID."})
		return
	}

	post, err := models.GetPostByID(postID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Post not found."})
		return
	}

	if post.Author.ID.Hex() != user.(models.User).ID.Hex() {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	if err := models.DeletePost(postID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error deleting post."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Post deleted."})
}
