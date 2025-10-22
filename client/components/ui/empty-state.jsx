import React from "react";
import { Button } from "./button";

const EmptyState = ({ icon: Icon, title, description, action, actionLabel }) => {
	return (
		<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
			{Icon && (
				<div className="mb-4 p-4 bg-muted rounded-full">
					<Icon className="h-12 w-12 text-muted-foreground" />
				</div>
			)}
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<p className="text-sm text-muted-foreground mb-6 max-w-md">
				{description}
			</p>
			{action && actionLabel && (
				<Button onClick={action}>
					{actionLabel}
				</Button>
			)}
		</div>
	);
};

export default EmptyState;

