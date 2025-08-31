import { useState } from 'react'
import { IImagePrompt } from '@/types/entity'

export const useFormState = () => {
  const [formData, setFormData] = useState<IImagePrompt | null>(null)
  const [showForm, setShowForm] = useState(true)

  const handleFormSubmit = async (values: IImagePrompt, submitFunction: (values: IImagePrompt) => Promise<void>) => {
    setFormData(values)
    setShowForm(false)
    
    await submitFunction(values)
  }

  const handleBackToForm = () => {
    setShowForm(true)
    setFormData(null)
  }

  return {
    formData,
    showForm,
    handleFormSubmit,
    handleBackToForm
  }
}
