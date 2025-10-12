"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Plus, Search, Filter, MoreVertical, Calendar, User, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import NewProjectModal from "../components/NewProjectModal";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <Clock className="h-4 w-4 text-blue-400" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-400";
    case "medium":
      return "text-yellow-400";
    case "low":
      return "text-green-400";
    default:
      return "text-gray-400";
  }
};

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
        setProjects([]);
      }
    } catch (error) {
      console.error('An error occurred while fetching projects:', error);
      setProjects([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    fetchProjects(); 
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>Projects</h1>
          <p className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>Manage all your projects and track progress</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}>
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`} />
          <input
            type="text"
            placeholder="Search projects..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 text-white placeholder-gray-400"
                : "bg-gray-100/80 border border-gray-400 text-gray-900 placeholder-gray-600 border-opacity-60"
            }`}
          />
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
          theme === "dark"
            ? "bg-white/10 hover:bg-white/20 border border-white/20"
            : "bg-gray-100/80 hover:bg-gray-200/90 border border-gray-300/50 shadow-sm"
        }`}>
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <Card className={`backdrop-blur-xl ${
        theme === "dark"
          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20"
          : "bg-gradient-to-r from-purple-100/80 to-blue-100/80 border border-gray-400 shadow-md border-opacity-60"
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              theme === "dark" ? "bg-purple-400" : "bg-purple-500"
            }`}></div>
            AI Project Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <strong>3 active projects</strong> with an average completion rate of 68%. 
            <strong> 2 high-priority</strong> items need attention. 
            <strong> Sarah Johnson</strong> has the highest workload with 2 active projects.
          </p>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <p className={theme === 'dark' ? 'text-white' : 'text-black'}>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Card key={project.id} className={`backdrop-blur-xl transition-all duration-300 group ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 hover:bg-white/15"
                : "bg-gray-50/90 border border-gray-400 hover:bg-gray-100/90 shadow-md border-opacity-60"
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className={`text-lg transition-colors ${
                      theme === "dark"
                        ? "text-white group-hover:text-blue-300"
                        : "text-gray-900 group-hover:text-blue-600"
                    }`}>
                      {project.name}
                    </CardTitle>
                    <p className={`text-sm mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>{project.client}</p>
                  </div>
                  <button 
                    className={`p-1 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-gray-200/50"
                    }`}
                    aria-label="More options"
                  >
                    <MoreVertical className={`h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <span className={`text-sm capitalize ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>{project.status}</span>
                  </div>
                  <span className={`text-sm font-medium ${getPriorityColor(project.priority || 'low')}`}>
                    {project.priority || 'low'}
                  </span>
                </div>
                <div>
                  <div className={`flex justify-between text-sm mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <span>Progress</span>
                    <span>{project.progress || 0}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    theme === "dark" ? "bg-white/10" : "bg-gray-200"
                  }`}>
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className={`flex items-center justify-between text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{project.assignee || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'numeric', 
                      day: 'numeric' 
                    }) : 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <NewProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}
