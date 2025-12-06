-- Prevent anyone from reading subscriber data
CREATE POLICY "Prevent public reads" 
ON public.subscribers 
FOR SELECT 
USING (false);

-- Prevent anyone from updating subscriber data  
CREATE POLICY "Prevent public updates"
ON public.subscribers
FOR UPDATE
USING (false);

-- Prevent anyone from deleting subscriber data
CREATE POLICY "Prevent public deletes"
ON public.subscribers
FOR DELETE
USING (false);