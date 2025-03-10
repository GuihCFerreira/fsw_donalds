"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf } from "@/helpers/cpf";

import { createOrder } from "../actions/create-order";
import { CartContext } from "../contexts/cart";

const formSchema = z.object({
    name: z.string().trim().min(3, {
        message: "O nome é obrigatório.",
    }),
    cpf: z
        .string()
        .trim()
        .min(1, {
            message: "O CPF é obrigatório.",
        })
        .refine((value) => isValidCpf(value), {
            message: "CPF inválido.",
        }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
    const searchParams = useSearchParams();
    const { products } = useContext(CartContext);
    const { slug } = useParams<{ slug: string }>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
        shouldUnregister: true,
    });

    const onSubmit = async (data: FormSchema) => {
        try {
            const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;

            startTransition(async () => {
                await createOrder({
                    consumptionMethod,
                    costumerCpf: data.cpf,
                    costumerName: data.name,
                    products,
                    slug,
                });

                onOpenChange(false);
                toast.success("Pedido finalizado com sucesso!");
            })

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu nome:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu CPF:</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="Digite seu CPF..."
                                                {...field}
                                                customInput={Input}
                                                format="###.###.###-##"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    className="rounded-full w-full"
                                    disabled={isPending}
                                >
                                    {isPending && <Loader2Icon className="animate-spin" />}
                                    {isPending ? "Finalizando..." : "Finalizar"}
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="rounded-full w-full">
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default FinishOrderDialog;
