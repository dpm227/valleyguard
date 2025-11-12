# 🛰️ ValleyGuard

ValleyGuard is a community-driven web application designed to report and visualize local environmental or safety incidents in real time. The platform leverages **AWS cloud services** for scalable, serverless data management and integrates an interactive **React** frontend for a seamless user experience.

## 🎥 Demo

Explore the live demo here:  
👉 **[https://dpm227.github.io/valleyguard](https://dpm227.github.io/valleyguard)**  

### What You Can Try
1. **View the live map** — See existing environmental or safety reports plotted in real time.  
2. **Submit a new report** — Fill out the form with details such as location and incident type.  
3. **Navigate between pages** — Switch between *Home*, *Report*, and *Submissions* using the React Router.  


---

## 🌍 Overview

ValleyGuard allows users to **submit incident reports** and **view active reports on a live map**.  
Each report is stored and retrieved from a DynamoDB database using AWS Lambda and API Gateway.

> **Note:** The original version of ValleyGuard was developed during the Leh-Laf hackathon.  
> You can view that original codebase here: [dpm227/communitymapp](https://github.com/dpm227/communitymapp)  
> The current repository reflects significant updates and a complete React-based rework.


### Key Features
- 🧭 **Interactive Map:** Displays incident locations using AWS Location Services.  
- 📝 **Incident Form:** Submit new incidents directly through the web interface.  
- ☁️ **Serverless Architecture:** Powered by AWS Lambda and API Gateway for efficient, scalable backend operations.  
- ⚛️ **React Frontend:** Modernized UI rebuilt using React for speed, modularity, and responsiveness.  

---

## 🧰 Tech Stack

### **Frontend**
- React (UI framework)
- Tailwind CSS / native CSS styling  
- AWS Location Services for map display  

### **Backend**
- **AWS Lambda** — Serverless compute for handling incident creation and retrieval  
- **Amazon DynamoDB** — NoSQL database for storing reports  
- **Amazon API Gateway** — Connects frontend requests to Lambda functions  

---

## 👥 Team

- [@Jickey0](https://github.com/Jickey0)  
- [@dpm227](https://github.com/dpm227)  
- [@averync2005](https://github.com/averync2005)  
- [@jimothych](https://github.com/jimothych)

---

## 🙏 Acknowledgements

Massive thanks to **Tiny Technical Tutorials** on YouTube for providing clear, concise AWS tutorials that made serverless integration possible.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss proposed updates.

> Make sure to include tests where applicable and follow established project conventions.

