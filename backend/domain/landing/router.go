package landing

import (
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Router(app *fiber.App, db *gorm.DB) {
	repo := NewRepository(db)

	// Upload banner
	app.Post("/api/landing-page/upload-banner", func(c *fiber.Ctx) error {
		// Parse multipart form
		form, err := c.MultipartForm()
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Failed to parse form data"})
		}

		// Ambil file
		files := form.File["banner"]
		if len(files) == 0 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "No file uploaded"})
		}

		// Simpan file pertama (hanya mendukung satu file untuk sekarang)
		file := files[0]
		fileName := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)
		filePath := fmt.Sprintf("./uploads/banners/%s", fileName)

		// Simpan file ke folder lokal
		if err := c.SaveFile(file, filePath); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save file"})
		}

		// Update database
		bannerType := c.FormValue("type") // Tipe banner: banner1 atau banner2
		if bannerType != "banner1" && bannerType != "banner2" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid banner type"})
		}

		// Ambil data landing dari database
		landing, err := repo.GetLandingPage()
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Landing page not found"})
		}

		// Update path banner di database
		if bannerType == "banner1" {
			landing.Banner1 = fmt.Sprintf("/uploads/banners/%s", fileName)
		} else if bannerType == "banner2" {
			landing.Banner2 = fmt.Sprintf("/uploads/banners/%s", fileName)
		}

		// Simpan perubahan ke database
		if err := repo.UpdateLandingPage(landing); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update banner"})
		}

		return c.JSON(fiber.Map{"message": "Banner uploaded successfully", "banner_url": fmt.Sprintf("/uploads/banners/%s", fileName)})
	})

	app.Delete("/api/landing-page/delete-banner", func(c *fiber.Ctx) error {
		bannerType := c.Query("type") // banner1 atau banner2
		if bannerType != "banner1" && bannerType != "banner2" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid banner type"})
		}

		// Ambil data landing
		landing, err := repo.GetLandingPage()
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Landing page not found"})
		}

		// Hapus file dari sistem
		var filePath string
		if bannerType == "banner1" {
			filePath = landing.Banner1
			landing.Banner1 = ""
		} else if bannerType == "banner2" {
			filePath = landing.Banner2
			landing.Banner2 = ""
		}

		if filePath != "" {
			err := os.Remove("." + filePath) // Pastikan path diawali dengan `./`
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete file"})
			}
		}

		// Update database
		if err := repo.UpdateLandingPage(landing); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update banner"})
		}

		return c.JSON(fiber.Map{"message": "Banner deleted successfully"})
	})
}
