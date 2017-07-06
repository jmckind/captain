# captain

Admin web-interface for a simple LMS.

### Development

Preview the application at http://localhost:8000/.

```
make preview
```

### Build

Build the image for the application.

```
docker build -t captain:latest .
```

### Deploy

Run the application container.

```
docker run --name captain -dp 8000:80 captain:latest
```
