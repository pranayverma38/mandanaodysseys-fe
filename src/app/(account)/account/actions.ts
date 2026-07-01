'use server'

export async function updateProfile(formData: FormData) {
  console.log('Profile updated:', Object.fromEntries(formData.entries()))
}

export async function updatePassword(formData: FormData) {
  console.log('Password update requested:', Object.fromEntries(formData.entries()))
}
