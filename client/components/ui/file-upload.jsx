"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";

const FileUpload = ({ files = [], onChange, maxFiles = 5 }) => {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef(null);

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFiles = Array.from(e.dataTransfer.files);
		handleFiles(droppedFiles);
	};

	const handleFileInput = (e) => {
		const selectedFiles = Array.from(e.target.files);
		handleFiles(selectedFiles);
	};

	const handleFiles = (newFiles) => {
		if (files.length + newFiles.length > maxFiles) {
			alert(`Você pode adicionar no máximo ${maxFiles} arquivos`);
			return;
		}

		// Criar objetos de arquivo com informações
		const fileObjects = newFiles.map((file) => ({
			id: Math.random().toString(36).substring(7),
			name: file.name,
			size: file.size,
			type: file.type,
			file: file,
			url: URL.createObjectURL(file),
		}));

		onChange([...files, ...fileObjects]);
	};

	const handleRemoveFile = (fileId) => {
		const updatedFiles = files.filter((f) => f.id !== fileId);
		onChange(updatedFiles);
	};

	const formatFileSize = (bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
	};

	return (
		<div className="space-y-3">
			{/* Área de Drop */}
			<div
				className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
					isDragging
						? "border-primary bg-primary/5"
						: "border-border hover:border-primary/50"
				}`}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
				<p className="text-sm text-muted-foreground mb-2">
					Arraste arquivos aqui ou clique para selecionar
				</p>
				<input
					ref={fileInputRef}
					type="file"
					multiple
					onChange={handleFileInput}
					className="hidden"
					accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
				/>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => fileInputRef.current?.click()}
				>
					Selecionar Arquivos
				</Button>
				<p className="text-xs text-muted-foreground mt-2">
					PDF, DOC, DOCX, JPG, PNG (máx. {maxFiles} arquivos)
				</p>
			</div>

			{/* Lista de Arquivos */}
			{files.length > 0 && (
				<div className="space-y-2">
					<p className="text-sm font-medium">
						Arquivos selecionados ({files.length}/{maxFiles})
					</p>
					<div className="space-y-2">
						{files.map((file) => (
							<div
								key={file.id}
								className="flex items-center gap-3 p-3 bg-muted rounded-lg"
							>
								<FileText className="h-5 w-5 text-primary flex-shrink-0" />
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium truncate">{file.name}</p>
									<p className="text-xs text-muted-foreground">
										{formatFileSize(file.size)}
									</p>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 flex-shrink-0"
									onClick={() => handleRemoveFile(file.id)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default FileUpload;

