import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./dialog";
import { Button } from "./button";
import { AlertTriangle } from "lucide-react";

const ConfirmationDialog = ({ 
	open, 
	onOpenChange, 
	title, 
	description, 
	onConfirm, 
	confirmLabel = "Confirmar",
	cancelLabel = "Cancelar",
	variant = "destructive"
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
							<AlertTriangle className="h-5 w-5 text-red-600" />
						</div>
						<DialogTitle>{title}</DialogTitle>
					</div>
					<DialogDescription className="pt-2">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{cancelLabel}
					</Button>
					<Button 
						variant={variant} 
						onClick={() => {
							onConfirm();
							onOpenChange(false);
						}}
					>
						{confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmationDialog;

