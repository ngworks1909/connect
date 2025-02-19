"use client"
import React from 'react'
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function AddContactButton() {
  return (
    <Button onClick={(e) => {e.preventDefault()}} >
        <Plus className="mr-2 h-4 w-4" /> Add New Banner
    </Button>
  )
}
