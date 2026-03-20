import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, UploadCloud, FileText, X, CheckCircle2, AlertCircle, Sparkles, ChevronDown } from 'lucide-react'

export default function UploadResumePage() {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    validateAndSetFile(droppedFile)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    validateAndSetFile(selectedFile)
  }

  const validateAndSetFile = (addedFile) => {
    if (!addedFile) return
    if (addedFile.type !== 'application/pdf') {
      setError('Only PDF files are supported')
      setFile(null)
      return
    }
    if (addedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit')
      setFile(null)
      return
    }
    setError('')
    setFile(addedFile)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = () => {
    if (!file) {
      setError('Please upload your resume to continue')
      return
    }
    if (!selectedRole) {
      setError('Please select a target role')
      return
    }
    setError('')
    alert("Analyzing Resume logic here...")
    // Integration logic goes here
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-surface py-12 px-6">
      {/* Background blobs to match the landing page theme */}
      <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft" />
      <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="gradient-blob w-[300px] h-[300px] bg-accent-purple-light top-1/4 right-1/4 animate-pulse-soft" style={{ animationDelay: '4s' }} />

      {/* Back button */}
      <Link to="/dashboard" className="absolute top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="relative z-10 w-full max-w-xl animate-fade-in-up">
        {/* Upload Card */}
        <div className="glass-effect rounded-[24px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] bg-white/50 border border-white/60">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-3 leading-tight">
              Upload Your Resume
            </h1>
            <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-sm mx-auto">
              Let our AI analyze your skills and create a personalized learning path.
            </p>
          </div>

          <div className="space-y-6">
            {/* Drag & Drop Zone */}
            <div 
              className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
                isDragging ? 'border-primary-500 bg-primary-50/50 scale-[1.02]' 
                : file ? 'border-gray-200 bg-white/60' 
                : 'border-gray-300 bg-white/40 hover:bg-white/70 hover:border-primary-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="application/pdf"
              />
              
              {!file ? (
                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragging ? 'bg-primary-100 text-primary-600' : 'bg-gray-100/80 text-ink/40 group-hover:bg-primary-50 md:group-hover:text-primary-500'}`}>
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-ink/80">Drag & drop your resume here</p>
                    <p className="text-sm text-ink-muted mt-1">or click to browse</p>
                  </div>
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-ink-muted/70">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-md">PDF only</span>
                    <span>•</span>
                    <span>Max size 5MB</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white/80 border border-gray-100 p-4 rounded-xl shadow-sm animate-fade-in relative z-10">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="text-left truncate">
                      <p className="text-sm font-semibold text-ink truncate">{file.name}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }} 
                      className="p-1.5 text-ink-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove File"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Target Role Dropdown */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink/80 block ml-1">Select your target role</label>
              <div className="relative">
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-ink appearance-none cursor-pointer"
                >
                  <option value="" disabled>Choose a role...</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="UX/UI Designer">UX/UI Designer</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
              </div>
            </div>

            {/* Submit Action */}
            <button 
              onClick={handleSubmit} 
              className={`w-full btn-primary !py-4 !rounded-2xl mt-2 transition-all duration-300 font-semibold text-base ${(!file || !selectedRole) ? 'opacity-80 cursor-not-allowed hover:-translate-y-0 hover:shadow-none' : 'hover:scale-[1.01]'}`}
            >
              Analyze Resume
            </button>
          </div>

        </div>

        {/* AI Info Card */}
        <div className="mt-6 glass-effect rounded-[20px] p-5 border border-white/60 bg-white/40 flex items-start gap-3 md:gap-4 shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-br from-primary-100 to-accent-purple-light p-2 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            <span className="font-semibold text-ink/90">AI-Powered Insights:</span> Our engine will deeply extract your skills, identify proficiency gaps, and dynamically generate a personalized learning roadmap tailored precisely to your target role.
          </p>
        </div>

      </div>
    </div>
  )
}
